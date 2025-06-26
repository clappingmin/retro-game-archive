'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import * as api from '@/shared/services/app/auth';
import { useUserStore } from '@/shared/store/user';
import { useAuth } from '@/shared/hooks/useAuth';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const user = useUserStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);
  const { logout } = useAuth();

  useEffect(() => setIsHydrated(true), []);
  if (!isHydrated) return null;

  const handleLogout = async () => {
    const result = await api.logoutUser();
    if (result) logout();
  };

  const handleAuthRouter = () => {
    const isAuthRoute = /^\/auth(\/|$)/.test(pathname);

    if (isAuthRoute) return '/';

    return encodeURIComponent(pathname);
  };

  return (
    <header className="layout">
      <div className="flex items-center justify-between gap-4">
        <Link href={'/'}>
          <h1 className="whitespace-nowrap text-2xl font-bold">플래시니티</h1>
        </Link>
        <Input className="max-w-xs" />
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button variant="secondary" onClick={handleLogout}>
              Log out
            </Button>
          ) : (
            <>
              <Link href={`/auth/login?redirect=${handleAuthRouter()}`}>
                <Button>Log in</Button>
              </Link>
              <Link href={`/auth/signup?redirect=${handleAuthRouter()}`}>
                <Button variant="secondary">Sign up</Button>
              </Link>
            </>
          )}
          {user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_UID}` && (
            <Link href="/admin">
              <Button>관리자</Button>
            </Link>
          )}
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
