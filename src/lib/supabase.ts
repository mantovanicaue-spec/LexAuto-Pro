import { createClient } from '@supabase/supabase-js';

const urlEnv = process.env.NEXT_PUBLIC_SUPABASE_URL;
const keyEnv = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = urlEnv && urlEnv.startsWith("http") ? urlEnv : 'https://placeholder.supabase.co';
const supabaseKey = keyEnv && keyEnv.trim() !== "" ? keyEnv : 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
