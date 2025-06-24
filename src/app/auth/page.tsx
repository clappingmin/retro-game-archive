import { redirect } from 'next/navigation';
import { createServer } from '@/shared/utils/supabase/server';

export default async function AuthIndexPage() {
  const supabase = await createServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/');

  redirect('/auth/login');
}
