import { FC } from 'react';

import styles from './styles.module.scss';

type Props = {
  children: JSX.Element;
  className: string | undefined;
};

const Card: FC<Props> = ({ children, className }: Props) => {
  return <div className={styles.cardWrapper + ' ' + className}>{children}</div>;
};

export default Card;
