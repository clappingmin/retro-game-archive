'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import * as api from '@/shared/services/app/auth';
import { LoginInput } from '@/shared/types/user';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // TODO: 로그인 상태시 홈으로
  }, []);

  const handleLogin = async () => {
    const userInput: LoginInput = { email, password };
    const result = await api.loginUser(userInput);

    if (result) redirect('/');
  };

  return (
    <div>
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
