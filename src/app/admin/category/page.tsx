import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CategoryOverviewPage() {
  return (
    <div>
      <Link href={'/admin/category/new'}>
        <Button>카테고리 추가하기</Button>
      </Link>
    </div>
  );
}
