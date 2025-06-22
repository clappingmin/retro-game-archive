import React from 'react';
import styles from './Header.module.scss';
import PrimaryButton from '../buttons/PrimaryButton/PrimaryButton';
import GrayButton from '../buttons/GrayButton/GrayButton';
import WhiteButton from '../buttons/WhiteButton/WhiteButton';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.topContainer}>
        <span className={styles.title}>
          <span className={styles.logo} />
          옛날<strong>게임</strong>나라
        </span>
        <input className={styles.searchbar}></input>
        <div className={styles.buttons}>
          <PrimaryButton>Log in</PrimaryButton>
          <GrayButton>Sign up</GrayButton>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <WhiteButton>슈게임</WhiteButton>
        <WhiteButton>로이월드</WhiteButton>
        <WhiteButton>쥬쥬게임</WhiteButton>
        <WhiteButton>비비빅</WhiteButton>
      </div>
    </header>
  );
}
