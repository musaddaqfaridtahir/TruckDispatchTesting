import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const isPlaceholder = (val: string) => 
  !val || 
  val.includes('your-project-id') || 
  val.includes('your-supabase-service-role-key') ||
  val === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

// Client safe for browser and edge runtime
export const supabase = (supabaseUrl && supabaseAnonKey && !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side privileged client with fallback
export function getServiceSupabase() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  if (!supabaseUrl || !serviceRoleKey || isPlaceholder(supabaseUrl) || isPlaceholder(serviceRoleKey)) return null;
  return createClient(supabaseUrl, serviceRoleKey);
}
