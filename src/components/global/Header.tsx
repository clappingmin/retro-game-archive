'use client';

import React, { useEffect, useState } from 'react';
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
        <input className="input max-w-xs" type="text" />
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <button onClick={handleLogout}>Log out</button>
          ) : (
            <>
              <Link href={`/auth/login?redirect=${handleAuthRouter()}`}>
                <button>Log in</button>
              </Link>
              <Link href={`/auth/signup?redirect=${handleAuthRouter()}`}>
                <button>Sign up</button>
              </Link>
            </>
          )}
          {user?.uid === `${process.env.NEXT_PUBLIC_ADMIN_UID}` && (
            <Link href="/admin">
              <button>관리자</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
