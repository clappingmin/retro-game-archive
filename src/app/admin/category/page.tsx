import Link from 'next/link';

export default function CategoryOverviewPage() {
  return (
    <div>
      <Link href={'/admin/category/new'}>
        <button className="btn">메인 카테고리 추가하기</button>
      </Link>
      <Link href={'/admin/category/sub/new'}>
        <button className="btn">서브카테고리 설정하기</button>
      </Link>
    </div>
  );
}
