'use client';

import { useEffect, useState } from 'react';
import * as api from '@/shared/services/admin/category';
import { GameCategory, GameSubcategory } from '@/shared/types/game';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function AdminNewSubcategoryPage() {
  const [mainCategories, setMainCategories] = useState<GameCategory[]>();
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    api.getAllCategories().then((categories: GameCategory[]) => {
      setMainCategories(categories);
    });
  }, []);

  const setDefaultSubCategoryInput = () => {
    setName('');
    setSlug('');
    setCategoryId(-1);
  };

  const handleAddSubCategory = async () => {
    const subCategory: GameSubcategory = {
      name,
      slug,
      categoryId,
    };

    const result = await api.addSubcategory(subCategory);

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
            <label htmlFor={String(item.id)}>{item.name}</label>
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
      </div>

      <button className="btn btn-primary" onClick={handleAddSubCategory}>
        서브카테고리 추가
      </button>
    </div>
  );
}
