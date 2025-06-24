import { redirect } from 'next/navigation';
import { createClient } from '@/shared/utils/supabase/server';

export default async function AuthIndexPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect('/');

  redirect('/auth/login');
}
