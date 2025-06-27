'use client';

import { useEffect, useState } from 'react';
import * as api from '@/shared/services/admin/category';
import { getTags } from '@/shared/services/admin/game';
import { GameCategory, GameSubCategory, GameTag } from '@/shared/types/game';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function AdminNewSubcategoryPage() {
  const [mainCategories, setMainCategories] = useState<GameCategory[]>();
  const [allTags, setAllTags] = useState<GameTag[]>([]);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [tagIds, setTagIds] = useState<number[]>([]);

  useEffect(() => {
    api.getAllCategories().then((categories: GameCategory[]) => {
      setMainCategories(categories);
    });

    getTags().then((tags: GameTag[]) => {
      setAllTags(tags);
    });
  }, []);

  const handleChangeTag = (tag: number) => {
    setTagIds((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const setDefaultSubCategoryInput = () => {
    setName('');
    setSlug('');
    setTagIds([]);
    setCategoryId(-1);
  };

  const handleAddSubCategory = async () => {
    const subCategory: GameSubCategory = {
      name,
      slug,
      categoryId,
    };

    const result = await api.addSubCategory(subCategory, tagIds);

    if (result) setDefaultSubCategoryInput();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="bold text-xl">메인 카테고리 선택</h1>
      <RadioGroup
        defaultValue={String(mainCategories?.[0].id)}
        className="flex"
        onValueChange={(value: string) => {
          setCategoryId(Number(value));
        }}
      >
        {mainCategories?.map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            <RadioGroupItem value={String(item.id)} id={String(item.id)} />
            <label htmlFor={String(item.id)}>{item.displayName}</label>
          </div>
        ))}
      </RadioGroup>
      <div className="h-[1px] w-full bg-gray-300"></div>
      <h1 className="bold text-xl">서브 카테고리 추가</h1>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="name">카테고리명</label>
          <input
            id="name"
            type="text"
            placeholder="카테고리명 입력하세요."
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="name">라우터명</label>
          <input
            id="name"
            type="text"
            placeholder="라우터명 입력하세요."
            value={slug}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
          />
        </div>
        <h1>태그 추가</h1>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <div className="flex w-fit items-center gap-3 whitespace-nowrap" key={tag.id}>
              <Checkbox
                id={`tag-${tag.id}`}
                checked={tagIds.includes(tag.id)}
                onCheckedChange={() => handleChangeTag(tag.id)}
              />
              <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleAddSubCategory}>서브카테고리 추가</Button>
    </div>
  );
}
