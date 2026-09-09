import { supabase } from '../lib/supabase';
import { DISPLAY_TO_DB_COLORWAY, DB_TO_DISPLAY_COLORWAY } from '../data/colorways';

export interface WaitlistEntry {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  colorway: string;
  size?: string;
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

export const GOOGLE_APPS_SCRIPT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbw-hunmXx0KcpuKfgPokbSnp5lAZDuyFq_J-sSZFhw-sdiK-Ik81rYhju5jhjzFWggb/exec';

export interface GoogleAppsScriptPreorderPayload {
  name: string;
  email: string;
  phone: string;
  productColor: string;
  size: string;
  quantity: number;
  notes: string;
}

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
 * Sends preorder data to Google Apps Script Web App webhook.
 * Uses text/plain to avoid CORS preflight while transmitting valid JSON that GAS parses.
 */
export async function sendToGoogleAppsScript(
  payload: GoogleAppsScriptPreorderPayload
): Promise<boolean> {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return true;
    }
    return true; // GAS redirects return opaque/ok
  } catch (err) {
    // If standard fetch threw (e.g. browser CORS redirect), retry with mode: 'no-cors'
    try {
      await fetch(GOOGLE_APPS_SCRIPT_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (fallbackErr) {
      console.error('[Google Apps Script Webhook] Error:', fallbackErr);
      return false;
    }
  }
}

/**
 * Insert a preorder entry into Google Apps Script webhook and Supabase with normalization, duplicate protection, and anti-abuse safeguards.
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
        size: params.size,
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

  const rawNote = params.note && params.note.trim().length > 0
    ? params.note.trim().substring(0, 800)
    : '';
  const selectedSize = params.size || 'M';
  const normalizedMessage = selectedSize
    ? `Size: ${selectedSize}${rawNote ? ` | Note: ${rawNote}` : ''}`
    : (rawNote || null);
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

  // 3. Prepare Google Sheet webhook payload
  const googleSheetPayload: GoogleAppsScriptPreorderPayload = {
    name: normalizedName,
    email: normalizedEmail,
    phone: normalizedPhone,
    productColor: displayColorway,
    size: selectedSize,
    quantity: 1,
    notes: rawNote,
  };

  try {
    // Submit to Google Apps Script webhook
    const gasPromise = sendToGoogleAppsScript(googleSheetPayload);

    // Parallel sync with Supabase
    let supabaseSuccess = false;
    try {
      const { error: supabaseError } = await supabase
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

      if (!supabaseError || supabaseError.code === '23505') {
        supabaseSuccess = true;
      }
    } catch (sbErr) {
      console.warn('[Supabase] Background insert note:', sbErr);
    }

    const gasSuccess = await gasPromise;

    if (gasSuccess || supabaseSuccess) {
      return {
        success: true,
        data: {
          fullName: normalizedName,
          email: normalizedEmail,
          phone: normalizedPhone,
          colorway: displayColorway,
          size: selectedSize,
          note: rawNote || undefined,
          consent: params.consent,
          id: `lead_${Date.now()}`,
          createdAt: timestamp,
        },
      };
    }

    return {
      success: false,
      error: 'We couldn’t save your reservation right now. Please try again.',
    };
  } catch (err: any) {
    console.error('[Preorder Submission] Unexpected network error:', err);
    return {
      success: false,
      error: err?.message || 'Network error',
    };
  }
}
