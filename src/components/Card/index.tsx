import { FC } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

import styles from './styles.module.scss';

interface Props extends ComponentPropsWithoutRef<'div'> {
  children: JSX.Element;
  className?: string;
}

const Card: FC<Props> = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={styles.cardWrapper + ' ' + className}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
