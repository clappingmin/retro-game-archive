import AdminNavBar from '@/components/admin/AdminNavBar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full min-w-[720px] gap-8">
      <AdminNavBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
