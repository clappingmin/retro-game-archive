'use client';

import { GameTag } from '@/shared/types/game';
import { useEffect, useState } from 'react';
import * as api from '@/shared/services/admin/game';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function AdminNewCategoryPage() {
  const [tags, setTags] = useState<number[]>([]); // 카테고리 포함될 태그들
  const [allTags, setAllTags] = useState<GameTag[]>([]); // 디비에 저장된 모든 태그

  useEffect(() => {
    api.getTags().then(setAllTags);
  }, []);

  const handleChangeTag = (tag: number) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="bold mb-4 text-xl">카테고리 추가</h1>
      <div className="flex gap-4">
        <label htmlFor="dispaly_name">카테고리명 (display용)</label>
        <input placeholder="카테고리명 (display용)" id="dispaly_name"></input>
      </div>
      <div className="flex gap-4">
        <label htmlFor="slug">라우터용</label>
        <input placeholder="라우터용" id="slug"></input>
      </div>

      <h1 className="bold text-lg">태그 선택</h1>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <div className="flex w-fit items-center gap-3 whitespace-nowrap" key={tag.id}>
            <Checkbox
              id={`tag-${tag.id}`}
              checked={tags.includes(tag.id)}
              onCheckedChange={() => handleChangeTag(tag.id)}
            />
            <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
          </div>
        ))}
      </div>
      <Button>카테고리 추가하기</Button>
    </div>
  );
}
