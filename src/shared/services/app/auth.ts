import { LoginInput, SignupInput, User } from '@/shared/types/user';
import { supabase } from '@/shared/utils/supabase/client';

export async function loginUser(userInput: LoginInput): Promise<User> {
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
      nickname,
      email,
    };

    return user;
  } catch (error: unknown) {
    throw error;
  }
}

export async function signupUser(userInput: SignupInput): Promise<User> {
  try {
    const { nickname, email, password } = userInput;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    if (!data.user) throw error;

    // 닉네임 저장
    const { error: updateError } = await supabase.auth.updateUser({
      data: { nickname },
    });
    if (updateError) throw updateError;

    const user: User = {
      uid: data.user.id,
      nickname,
      email,
    };

    return user;
  } catch (error: unknown) {
    throw error;
  }
}

export async function logoutUser(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    return true;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getSession() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  } catch (error: unknown) {
    throw error;
  }
}
