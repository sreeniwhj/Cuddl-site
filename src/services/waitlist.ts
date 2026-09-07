/**
 * CuddlWear Waitlist Service (Frontend-Only / Demo Mode)
 *
 * Persists waitlist leads to localStorage under the key 'cuddlwear_waitlist_leads'.
 * Preserves existing entries and appends new entries in a JSON array.
 */

export interface WaitlistEntry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  colorway: string;
  note?: string;
  consent: boolean;
  createdAt: string;
}

export const WAITLIST_STORAGE_KEY = 'cuddlwear_waitlist_leads';

/**
 * Retrieve all stored waitlist entries from localStorage safely.
 */
export function getWaitlistEntries(): WaitlistEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('[CuddlWear Waitlist] Error reading from localStorage:', err);
    return [];
  }
}

/**
 * Save a new waitlist entry to localStorage.
 */
export async function submitWaitlistEntry(
  data: Omit<WaitlistEntry, 'id' | 'createdAt'>
): Promise<{ success: boolean; data: WaitlistEntry }> {
  // Simulate standard network latency (300ms)
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newEntry: WaitlistEntry = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const existingEntries = getWaitlistEntries();
      const updatedList = [newEntry, ...existingEntries];
      window.localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(updatedList));
      console.log(
        `[CuddlWear Waitlist] Saved lead to localStorage (${WAITLIST_STORAGE_KEY}). Total leads: ${updatedList.length}`,
        newEntry
      );
    } catch (err) {
      console.error('[CuddlWear Waitlist] Error writing to localStorage:', err);
    }
  } else {
    console.warn('[CuddlWear Waitlist] window.localStorage is unavailable.');
  }

  return {
    success: true,
    data: newEntry,
  };
}
