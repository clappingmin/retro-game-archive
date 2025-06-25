'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getSession } from '@/shared/services/app/auth';
import { useAuth } from '@/shared/hooks/useAuth';

export default function SessionWatcher() {
  const pathname = usePathname();
  const { login, logout } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        const {
          user: {
            id,
            email,
            user_metadata: { nickname },
          },
        } = session;

        const user = { uid: id, email, nickname };
        login(user);
      } else {
        logout();
      }
    };

    checkSession();
  }, [pathname]);

  return null; // 렌더링 안하는 감시 전용 컴포넌트
}
