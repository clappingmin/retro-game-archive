import Link from 'next/link';

export default function AdminNavBar() {
  return (
    <div className="flex-0 flex flex-col">
      <Link href={'/admin'} className="menu">
        어드민 메인
      </Link>
      <Link href={'/admin/game'} className="menu">
        게임 관리하기
      </Link>
      <Link href={'/admin/category'} className="menu">
        카테고리 관리하기
      </Link>
      <Link href={'/'} className="menu">
        랜딩 관리하기
      </Link>
    </div>
  );
}
