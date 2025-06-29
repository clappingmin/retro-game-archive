'use client';
import styles from './page.module.scss';
import { GAME_TYPE_RADIO_ITEMS } from '@/shared/constants/game';
import React, { useState } from 'react';
import { GameBase, GameStorageData, GameType } from '@/shared/types/game';
import * as api from '@/shared/services/admin/game';
import CategorySelector from '@/components/admin/CategorySelector';

export default function AdminNewGamePage() {
  const [gameType, setGameType] = useState<GameType>('flash');
  const [gameFile, setGameFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [howToPlay, setHowToPlay] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [subcategoryIds, setSubcategoryIds] = useState<number[]>([]);

  const handleGameFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setGameFile(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setPreview(reader.result as string);
    }
  };

  const setDeafaultGameInput = () => {
    setGameType('flash');
    setGameFile(null);
    setPreview(null);
    setThumbnail(null);
    setName('');
    setDescription('');
    setHowToPlay('');
    setCompany('');
    setIsActive(true);
    setIsFeatured(false);
  };

  const handleAddNewGame = async () => {
    if (!gameFile || !thumbnail) return;

    const newGame: GameBase = {
      gameType,
      name,
      description,
      howToPlay,
      viewCount: 0,
      isFeatured,
      isActive,
      company,
    };

    const storageDate: GameStorageData = {
      thumbnail,
      gameFile,
    };

    const categoryInfo = {
      categoryIds,
      subcategoryIds,
    };

    await api.addNewGame(newGame, storageDate, categoryInfo);
    setDeafaultGameInput();
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임 추가하기</h1>

      {/* 게임 타입 */}
      {/* TODO: 게임 타입 선택 컴포넌트 분리할 지 선택하기 */}
      <div
        className="flex"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGameType(e.target.value as GameType)
        }
      >
        {GAME_TYPE_RADIO_ITEMS.map((item) => (
          <div className="flex items-center gap-3" key={item.value}>
            <input
              type="radio"
              className="radio radio-primary"
              name="gameType"
              value={item.value}
              id={item.value}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </div>

      {/* 게임 파일 */}
      <input type="file" onChange={handleGameFileChange} />

      <div className={styles.formContainer}>
        <div className={styles.thumbnailWrapper}>
          {/* 게임 썸네일 */}
          <label className={styles.thumbnailWrapper} htmlFor="thumbnail">
            {preview && <img className={styles.thumbnailPreview} src={preview} />}
          </label>
          <input id="thumbnail" type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className={styles.inputContainer}>
          {/* 게임 이름 */}
          <div className={styles.inputBox}>
            <label htmlFor="name">게임 이름</label>
            <input
              id="name"
              type="text"
              placeholder="게임 이름을 입력하세요."
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>
          {/* 게임 설명 */}
          <div className={styles.inputBox}>
            <label htmlFor="description">게임 설명</label>
            <textarea
              id="description"
              placeholder="게임 설명을 입력하세요."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </div>
          {/* 게임 방법 */}
          <div className={styles.inputBox}>
            <label htmlFor="howToPlay">게임 방법</label>
            <textarea
              id="howToPlay"
              placeholder="게임 방법을 입력하세요."
              value={howToPlay}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setHowToPlay(e.target.value)}
            />
          </div>
          {/* 게임 회사 */}
          <div className={styles.inputBox}>
            <label htmlFor="company">게임 회사</label>
            <input
              id="company"
              placeholder="게임 회사를 입력하세요."
              value={company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
            />
          </div>
          {/* 게임 활성화 여부 */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isActive"
              defaultChecked
              checked={isActive}
              className="checkbox"
              onChange={() => setIsActive((prev) => !prev)}
            />
            <label htmlFor="isActive">활성화</label>
          </div>
          {/* 게임 추천 여부 */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isFeatured"
              className="checkbox"
              checked={isFeatured}
              onChange={() => {
                setIsFeatured((prev) => !prev);
              }}
            />
            <label htmlFor="isFeatured">추천</label>
          </div>
        </div>
      </div>
      <CategorySelector
        onChange={({ categoryIds, subcategoryIds }) => {
          setCategoryIds(categoryIds);
          setSubcategoryIds(subcategoryIds); // 이걸로 API 요청하거나 상태 관리하면 됨
        }}
      />

      <button className="btn btn-primary" onClick={handleAddNewGame}>
        추가하기
      </button>
    </div>
  );
}
