import { supabase } from '@/shared/utils/supabase/client';

export async function loginUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // TODO: data 유저정보 전역 상태로 저장

    if (error) throw error;
  } catch (error: unknown) {
    throw error;
  }
}

export async function signupUser(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    // TODO: data 유저정보 전역 상태로 저장

    if (error) throw error;
  } catch (error: unknown) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();

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
