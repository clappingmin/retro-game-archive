import { supabase } from '@/shared/utils/supabase/client';

export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getAccessToken() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session?.access_token;
  } catch (error: unknown) {
    throw error;
  }
}
