import React from 'react';
import styles from './BaseButton.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size: 'large' | 'medium' | 'small';
};

export default function BaseButton({ children, onClick, className = '', size = 'medium' }: Props) {
  return (
    <button onClick={onClick} className={`${styles.base} ${styles[`size-${size}`]} ${className}`}>
      {children}
    </button>
  );
}
