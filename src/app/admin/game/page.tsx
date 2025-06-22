import Link from 'next/link';
import styles from './page.module.scss';

export default function AdminGameListPage() {
  return (
    <div>
      어드민 게임 리스트 페이지
      <Link href={'/admin/game/new'} className={styles.nav}>
        게임 추가하기
      </Link>
    </div>
  );
}
