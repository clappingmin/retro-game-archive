'use client';
import styles from './page.module.scss';
import { GAME_TYPE_RADIO_ITEMS } from '@/shared/constants/game';
import { TAG } from '@/shared/mocks/tag';
import React from 'react';
export default function AdminNewGamePage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>게임 추가 페이지</h1>
      {/* TODO: 게임 타입 선택 컴포넌트 분리할 지 선택하기 */}
      {/* <RadioGroup.Root defaultValue="flash">
        {GAME_TYPE_RADIO_ITEMS.map((item) => (
          <RadioGroup.Item key={item.value} value={item.value}>
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root> */}
      <input type="file" />
      <div className={styles.formContainer}>
        <div className={styles.thumbnailWrapper}>
          <label className={styles.thumbnailWrapper} htmlFor="thumbnail">
            {false && <img className={styles.thumbnailPreview} />}
          </label>
          <input id="thumbnail" type="file" accept="image/*" />
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
          {/* <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Label>활성화</Checkbox.Label>
            <Checkbox.Control />
          </Checkbox.Root>
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Label>추천</Checkbox.Label>
            <Checkbox.Control />
          </Checkbox.Root> */}
        </div>
      </div>
      <div className={styles.tagContainer}>
        {/* <CheckboxGroup defaultValue={['슈게임']} className={styles.tagCheckboxGroup}>
          {TAG.map((tag, index) => (
            <Checkbox.Root key={index} value={tag} className={styles.tagCheckbox}>
              <Checkbox.HiddenInput />
              <Checkbox.Label>{tag}</Checkbox.Label>
              <Checkbox.Control />
            </Checkbox.Root>
          ))}
        </CheckboxGroup> */}
      </div>
      <div className={styles.inputBox}>
        <label htmlFor="tag">새로운 태그 추가</label>
        <input id="tag" placeholder="추가할 태그를 입력하세요." />
      </div>
    </div>
  );
}
