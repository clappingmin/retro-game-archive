'use client';

import { useEffect, useState } from 'react';
import * as api from '@/shared/services/admin/category';
import { GameCategory, GameSubcategory } from '@/shared/types/game';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';

type Props = {
  onChange?: (payload: { categoryIds: number[]; subcategoryIds: number[] }) => void;
};

export default function CategorySelector({ onChange }: Props) {
  const [categories, setCategories] = useState<GameCategory[]>([]);
  const [subcategoryMap, setSubcategoryMap] = useState<Map<number, GameSubcategory[]>>();

  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [subcategoryIds, setSubcategoryIds] = useState<number[]>([]);

  useEffect(() => {
    Promise.all([api.getAllCategories(), api.getAllSubcategories()]).then(
      ([categories, subcategories]) => {
        setCategories(categories);

        // 가공 시작
        const grouped = new Map<number, GameSubcategory[]>();

        subcategories.forEach((sub) => {
          const list = grouped.get(sub.categoryId) ?? [];
          list.push(sub);
          grouped.set(sub.categoryId, list);
        });

        setSubcategoryMap(grouped);
      },
    );
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({ categoryIds, subcategoryIds });
    }
  }, [categoryIds, subcategoryIds, onChange]);

  const handleClickCategory = (id: number) => {
    const isAlreadySelected = categoryIds.includes(id);

    // 1. 선택 해제일 경우
    if (isAlreadySelected) {
      setCategoryIds((prev) => prev.filter((c) => c !== id));

      const subsToRemove = subcategoryMap?.get(id)?.map((s) => s.id) ?? [];
      setSubcategoryIds((prev) => prev.filter((sid) => !subsToRemove.includes(sid)));
    } else {
      // 2. 선택 추가일 경우
      setCategoryIds((prev) => [...prev, id]);
    }
  };

  const handlerClickSubcategory = (id: number, mainCategoryId: number) => {
    setCategoryIds((prev) => (prev.includes(mainCategoryId) ? prev : [...prev, mainCategoryId]));
    setSubcategoryIds((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  return (
    <div className="flex flex-col gap-4">
      {categories.map((category: GameCategory) => (
        <Breadcrumb key={category.id}>
          <BreadcrumbList className="items-start">
            <BreadcrumbItem
              className={`cursor-pointer rounded-sm px-2 py-1 ${categoryIds.includes(category.id!) && 'bg-yellow-200'}`}
              onClick={() => {
                handleClickCategory(category.id!);
              }}
            >
              {category.name}
            </BreadcrumbItem>
            {subcategoryMap?.get(category.id!) && (
              <div className="flex flex-col items-center gap-4">
                {subcategoryMap?.get(category.id!)?.map((subcategory) => (
                  <div className="flex w-full items-center gap-4" key={subcategory.id!}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem
                      key={subcategory.id}
                      className={`cursor-pointer rounded-sm border-gray-400 bg-gray-200 px-2 py-1 ${subcategoryIds.includes(subcategory.id!) && 'bg-yellow-200'}`}
                      onClick={() => {
                        handlerClickSubcategory(subcategory.id!, category.id!);
                      }}
                    >
                      {subcategory.name}
                    </BreadcrumbItem>
                  </div>
                ))}
              </div>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  );
}
