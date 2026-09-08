import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://phdncdybpqletinhkvir.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZG5jZHlicHFsZXRpbmhrdmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4MTQ3NjYsImV4cCI6MjEwNDM5MDc2Nn0.dp80y4WyX3tO2AAD84nb2HuuQdsNjXbaIxzT17AphCE';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] Missing Supabase environment configuration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
