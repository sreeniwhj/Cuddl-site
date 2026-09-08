import { supabase } from '../lib/supabase';
import { DISPLAY_TO_DB_COLORWAY, DB_TO_DISPLAY_COLORWAY } from '../data/colorways';

export interface WaitlistEntry {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  colorway: string;
  note?: string;
  consent: boolean;
  createdAt?: string;
}

export interface SubmitWaitlistParams extends Omit<WaitlistEntry, 'id' | 'createdAt'> {
  honeypot?: string;
}

export interface SubmitResult {
  success: boolean;
  isDuplicate?: boolean;
  data?: WaitlistEntry;
  error?: string;
}

const ALLOWED_DB_COLORWAYS = new Set([
  'Ash Grey',
  'Sand Beige',
  'Midnight Black',
  'Powder Blue',
]);

/**
 * Normalizes an Indian phone number to exactly 10 digits.
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.substring(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.substring(1);
  }
  return digits;
}

/**
 * Insert a waitlist entry into Supabase with normalization, duplicate protection, and anti-abuse safeguards.
 */
export async function submitWaitlistEntry(
  params: SubmitWaitlistParams
): Promise<SubmitResult> {
  // Anti-bot honeypot check: If filled, silently treat as success without calling DB
  if (params.honeypot && params.honeypot.trim().length > 0) {
    console.warn('[Waitlist] Honeypot triggered, ignoring spam submission.');
    return {
      success: true,
      data: {
        fullName: params.fullName,
        email: params.email,
        phone: params.phone,
        colorway: params.colorway,
        consent: params.consent,
      },
    };
  }

  // 1. Normalize data
  const normalizedName = params.fullName.trim();
  const normalizedEmail = params.email.trim().toLowerCase();
  const normalizedPhone = normalizePhone(params.phone);
  
  // Map display name to database allowed value
  const mappedDbColorway = DISPLAY_TO_DB_COLORWAY[params.colorway] || params.colorway;
  const dbColorway = ALLOWED_DB_COLORWAYS.has(mappedDbColorway)
    ? mappedDbColorway
    : 'Ash Grey';
  
  const displayColorway = DB_TO_DISPLAY_COLORWAY[dbColorway] || dbColorway;

  const normalizedMessage = params.note && params.note.trim().length > 0
    ? params.note.trim().substring(0, 1000)
    : null;
  const timestamp = new Date().toISOString();

  // 2. Client-side sanity checks before network call
  if (normalizedName.length < 2 || normalizedName.length > 100) {
    return { success: false, error: 'Full name must be between 2 and 100 characters.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 255) {
    return { success: false, error: 'Please provide a valid email address.' };
  }
  if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
    return { success: false, error: 'Please provide a valid 10-digit Indian mobile number.' };
  }
  if (!params.consent) {
    return { success: false, error: 'Consent is required to join the waitlist.' };
  }

  try {
    const { error } = await supabase
      .from('waitlist_entries')
      .insert([
        {
          full_name: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          preferred_colorway: dbColorway,
          message: normalizedMessage,
          consent_given: params.consent,
          consent_timestamp: timestamp,
          status: 'pending',
        },
      ]);

    if (error) {
      // Safe duplicate submission handling (Postgres unique constraint violation)
      if (error.code === '23505' || error.message.includes('unique') || error.message.includes('duplicate')) {
        console.info('[Waitlist] Duplicate lead received, gracefully handled.');
        return {
          success: true,
          isDuplicate: true,
          data: {
            fullName: normalizedName,
            email: normalizedEmail,
            phone: normalizedPhone,
            colorway: displayColorway,
            consent: params.consent,
            createdAt: timestamp,
          },
        };
      }

      console.error('[Supabase Waitlist] Insert error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data: {
        fullName: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone,
        colorway: displayColorway,
        note: normalizedMessage || undefined,
        consent: params.consent,
        id: `lead_${Date.now()}`,
        createdAt: timestamp,
      },
    };
  } catch (err: any) {
    console.error('[Supabase Waitlist] Unexpected network error:', err);
    return {
      success: false,
      error: err?.message || 'Network error',
    };
  }
}
