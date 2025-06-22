import BaseButton from '../BaseButton/BaseButton';
import styles from './PrimaryButton.module.scss';

export default function PrimaryButton(props: any) {
  return <BaseButton {...props} className={styles.primary} />;
}
