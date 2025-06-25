import { setLoggedInUser } from '@/shared/store/user';
import { LoginInput, SignupInput, User } from '@/shared/types/user';
import { supabase } from '@/shared/utils/supabase/client';

export async function loginUser(userInput: LoginInput) {
  try {
    const { email, password } = userInput;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    const {
      user: {
        id,
        user_metadata: { nickname },
      },
    } = data;

    const user: User = {
      uid: id,
      nickname: nickname,
      email,
    };

    setLoggedInUser(user);

    return true;
  } catch (error: unknown) {
    throw error;
  }
}

export async function signupUser(userInput: SignupInput) {
  try {
    const { nickname, email, password } = userInput;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    const { error: updateError } = await supabase.auth.updateUser({
      data: { nickname },
    });

    if (updateError) throw updateError;

    // TODO: data 유저정보 전역 상태로 저장

    return true;
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
