import Link from 'next/link';

export default function AdminGameListPage() {
  return (
    <div>
      어드민 게임 리스트 페이지
      <Link href={'/admin/game/new'}>
        <button className="btn btn-primary">게임 추가하기</button>
      </Link>
    </div>
  );
}
