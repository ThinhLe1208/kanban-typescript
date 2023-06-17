import React from 'react';
import { useRouteError } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {};

const ErrorPage = (props: Props) => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPageWrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
