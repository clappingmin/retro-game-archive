'use client';
import styles from './page.module.scss';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { GAME_TYPE_RADIO_ITEMS } from '@/shared/constants/game';
import { TAG } from '@/shared/mocks/tag';
import React, { useState } from 'react';
import PrimaryButton from '@/components/buttons/PrimaryButton/PrimaryButton';
export const dynamic = 'force-dynamic'; // 페이지가 동적이므로 캐싱하지 않도록 설정합니다.

export default function AdminNewGamePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result as string);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임 추가하기</h1>

      {/* TODO: 게임 타입 선택 컴포넌트 분리할 지 선택하기 */}
      <RadioGroup defaultValue="flash" className="flex">
        {GAME_TYPE_RADIO_ITEMS.map((item) => (
          <div className="flex items-center gap-3" key={item.value}>
            <RadioGroupItem value={item.value} id={item.value} />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </RadioGroup>
      <input type="file" />
      <div className={styles.formContainer}>
        <div className={styles.thumbnailWrapper}>
          <label className={styles.thumbnailWrapper} htmlFor="thumbnail">
            {preview && <img className={styles.thumbnailPreview} src={preview} />}
          </label>
          <input id="thumbnail" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputBox}>
            <label htmlFor="name">게임 이름</label>
            <input id="name" type="text" placeholder="게임 이름을 입력하세요." />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="description">게임 설명</label>
            <textarea id="description" placeholder="게임 설명을 입력하세요." />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="company">게임 회사</label>
            <input id="company" placeholder="게임 회사를 입력하세요." />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="isActive" defaultChecked />
            <label htmlFor="isActive">활성화</label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="isFeatured" />
            <label htmlFor="isFeatured">추천</label>
          </div>
        </div>
      </div>

      <form className="flex gap-2 flex-wrap">
        {TAG.map((tag, index) => (
          <div className="flex items-center gap-3 w-fit whitespace-nowrap" key={index}>
            <Checkbox id={`tag-${tag}`} />
            <label htmlFor={`tag-${tag}`}>{tag}</label>
          </div>
        ))}
      </form>

      <div className="flex gap-2">
        <input id="tag" placeholder="추가할 태그를 입력하세요." />
        <PrimaryButton>태그 추가하기</PrimaryButton>
      </div>

      <PrimaryButton>추가하기</PrimaryButton>
    </div>
  );
}
