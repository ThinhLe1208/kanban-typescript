import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import styles from './styles.module.scss';
import { USER_LOGIN, REMEMBER_USER } from 'utils/constants/settingSystem';

type Props = {};

const AuthTemplate = (props: Props) => {
  // // check the user 's remember status
  // if (localStorage.getItem(USER_LOGIN) && !!localStorage.getItem(REMEMBER_USER)) {
  //   // error
  //   // showNotification('info', 'You may need to log out !');
  //   return (
  //     <Navigate
  //       to='/project/management'
  //       replace={true}
  //     />
  //   );
  // }

  return (
    <div className={styles.authTemplateWrapper}>
      <div className={styles.leftSide}>
        <img
          src={require('assets/images/auth_background.svg').default}
          alt='img'
        />
      </div>

      <div className={styles.rightSide}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthTemplate;
