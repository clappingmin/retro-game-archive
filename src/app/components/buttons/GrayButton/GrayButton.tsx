import BaseButton from '../BaseButton/BaseButton';
import styles from './GrayButton.module.scss';

export default function GrayButton(props: any) {
  return <BaseButton {...props} className={styles.gray} />;
}
