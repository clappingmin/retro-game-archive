'use client';

import { useEffect, useState } from 'react';
import * as api from '@/shared/services/app/auth';
import { SignupInput } from '@/shared/types/user';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '@/shared/store/user';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const handleSignup = async () => {
    try {
      const userInput: SignupInput = { nickname, email, password };
      const user = await api.signupUser(userInput);

      if (!user) {
        // TODO: 안된 이유 띄우기
        return;
      }

      login(user);
    } catch (error) {
      // TODO: 안된 이유 띄우기
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const redirectPath = searchParams.get('redirect') || '/';
      router.replace(redirectPath);
    }
  }, [isLoggedIn]);

  return (
    <div>
      <input
        className="input"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        type="text"
      />
      <input
        className="input"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <input
        className="input"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button className="btn btn-primary" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}
