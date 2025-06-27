'use client';
import styles from './page.module.scss';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { GAME_TYPE_RADIO_ITEMS } from '@/shared/constants/game';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GameBase, GameStorageData, GameTag, GameType } from '@/shared/types/game';
import * as api from '@/shared/services/admin/game';

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
  const [tags, setTags] = useState<number[]>([]); // 게임 태그
  const [allTags, setAllTags] = useState<GameTag[]>([]); // 디비에 저장된 모든 태그
  const [newTag, setNewTag] = useState<string>(''); // 디비에 추가할 태그

  useEffect(() => {
    api.getTags().then(setAllTags);
  }, []);

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

  const handleNewTag = async () => {
    try {
      if (!newTag) return;

      // 디비에 새태그 저장
      const tagId = await api.addGameTag(newTag);
      setAllTags((prevTags: GameTag[]) => [...prevTags, { id: tagId, name: newTag }]);
      setNewTag('');
    } catch (error) {
      console.error('태그 추가 실패:', error);
    }
  };

  const handleChangeTag = (tag: number) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
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
    setTags([]);
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

    await api.addNewGame(newGame, storageDate, tags);
    setDeafaultGameInput();
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임 추가하기</h1>

      {/* 게임 타입 */}
      {/* TODO: 게임 타입 선택 컴포넌트 분리할 지 선택하기 */}
      <RadioGroup
        defaultValue={gameType}
        className="flex"
        onValueChange={(value: GameType) => setGameType(value)}
      >
        {GAME_TYPE_RADIO_ITEMS.map((item) => (
          <div className="flex items-center gap-3" key={item.value}>
            <RadioGroupItem value={item.value} id={item.value} />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </RadioGroup>

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
            <Checkbox
              id="isActive"
              defaultChecked
              checked={isActive}
              onCheckedChange={(checked: boolean) => setIsActive(checked)}
            />
            <label htmlFor="isActive">활성화</label>
          </div>
          {/* 게임 추천 여부 */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={(checked: boolean) => setIsFeatured(checked)}
            />
            <label htmlFor="isFeatured">추천</label>
          </div>
        </div>
      </div>

      {/* 게임 태그 선택 */}
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

      <div className="flex gap-2">
        <input
          id="tag"
          placeholder="추가할 태그를 입력하세요."
          value={newTag}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTag(e.target.value)}
        />
        <Button variant="default" onClick={handleNewTag}>
          태그 추가하기
        </Button>
      </div>

      <Button onClick={handleAddNewGame}>추가하기</Button>
    </div>
  );
}
