import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import styles from './styles.module.scss';

type Props = {};

const ProjectTemplate = (props: Props) => {
  // check user signin or not
  //  if (!localStorage.getItem(ACCESS_TOKEN) || !localStorage.getItem(CURRENT_USER)) {
  //   showNotification('error', 'You may need to sign in !');
  //   return <Navigate to='/error' replace={true} />;
  // }

  return (
    <Layout className={styles.wrapper}>
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

export default ProjectTemplate;
