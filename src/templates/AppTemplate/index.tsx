import { Layout } from 'antd';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useAppDispatch } from 'redux/configureStore';
import { optionsThunk } from 'redux/thunks/optionsThunk';
import styles from './styles.module.scss';
import { Content } from 'antd/es/layout/layout';

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
    <Layout
      className={styles.appTemplateWrapper}
      hasSider
    >
      <Sidebar />

      <Layout className={styles.body}>
        <Header />

        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppTemplate;
