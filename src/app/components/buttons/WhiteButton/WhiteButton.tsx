import BaseButton from '../BaseButton/BaseButton';
import styles from './WhiteButton.module.scss';

export default function WhiteButton(props: any) {
  return <BaseButton {...props} className={styles.white} />;
}
