'use client';

import { GameCategory } from '@/shared/types/game';
import { useState } from 'react';
import * as api from '@/shared/services/admin/category';

export default function AdminNewCategoryPage() {
  const [name, setName] = useState(''); // 카테고리 표시명
  const [slug, setSlug] = useState(''); // 카테고리 라우터

  const setDeafaultCategoryInput = () => {
    setName('');
    setSlug('');
  };

  const handleAddNewCategory = async () => {
    const newCategory: GameCategory = {
      slug,
      name,
    };

    const result = await api.addCategory(newCategory);
    if (result) setDeafaultCategoryInput();
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="bold mb-4 text-xl">카테고리 추가</h1>
      <div className="flex gap-4">
        <label htmlFor="dispaly_name">카테고리명 (display용)</label>
        <input
          placeholder="카테고리명 (display용)"
          id="dispaly_name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <label htmlFor="slug">라우터용</label>
        <input
          placeholder="라우터용"
          id="slug"
          value={slug}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSlug(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={() => {
          handleAddNewCategory();
        }}
      >
        카테고리 추가하기
      </button>
    </div>
  );
}
