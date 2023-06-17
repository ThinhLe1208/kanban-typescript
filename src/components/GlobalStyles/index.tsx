import { FC } from 'react';

import './styles.module.scss';

type Props = {
  children: JSX.Element;
};

const GlobalStyles: FC<Props> = ({ children }: Props) => {
  return children;
};

export default GlobalStyles;
