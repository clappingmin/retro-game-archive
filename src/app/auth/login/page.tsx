'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import * as api from '@/shared/services/app/auth';
import { LoginInput } from '@/shared/types/user';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userInput: LoginInput = { email, password };
    await api.loginUser(userInput);
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
