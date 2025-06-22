import AdminNavBar from '@/components/admin/AdminNavBar';
import styles from './layout.module.scss';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <AdminNavBar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
