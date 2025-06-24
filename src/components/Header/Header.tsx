import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="layout">
      <div className="flex items-center justify-between gap-4">
        <Link href={'/'}>
          <h1 className="whitespace-nowrap text-2xl font-bold">플래시니티</h1>
        </Link>
        <Input className="max-w-xs" />
        <div className="flex items-center gap-2">
          <Button>Log in</Button>
          <Button variant="secondary">Sign up</Button>
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <Button variant="ghost">슈게임</Button>
        <Button variant="ghost">로이월드</Button>
        <Button variant="ghost">쥬쥬게임</Button>
        <Button variant="ghost">비비빅</Button>
      </div>
    </header>
  );
}
