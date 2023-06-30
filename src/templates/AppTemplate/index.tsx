import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useAppDispatch } from 'redux/configureStore';
import { optionsThunk } from 'redux/thunks/optionsThunk';
import styles from './styles.module.scss';

interface Props {}

const AppTemplate = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(optionsThunk.getPriority());
    dispatch(optionsThunk.getAllProjectCategory());
    dispatch(optionsThunk.getAllStatus());
    dispatch(optionsThunk.getAllTaskType());
  }, [dispatch]);

  // check user signin or not
  //  if (!localStorage.getItem(ACCESS_TOKEN) || !localStorage.getItem(CURRENT_USER)) {
  //   showNotification('error', 'You may need to sign in !');
  //   return <Navigate to='/error' replace={true} />;
  // }

  return (
    <Layout className={styles.appTemplateWrapper}>
      <Sidebar />

      <Layout className={styles.content}>
        <Header />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default AppTemplate;
