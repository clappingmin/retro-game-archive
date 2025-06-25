'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import * as api from '@/shared/services/app/auth';
import { SignupInput } from '@/shared/types/user';
import { redirect } from 'next/navigation';

export default function SignupPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const userInput: SignupInput = { nickname, email, password };

    const result = await api.signupUser(userInput);

    if (!result) {
      // TODO: 안된 이유 띄우기
    }

    redirect('/');
  };

  return (
    <div>
      <Input
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        type="text"
      />
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
      <Button onClick={handleSignup}>Signup</Button>
    </div>
  );
}
