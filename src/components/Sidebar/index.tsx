import { ClusterOutlined, FileAddOutlined, LayoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/configureStore';
import { UiControlState } from 'redux/slices/uiControlSlice';
import styles from './styles.module.scss';

type Props = {};

const Sidebar = (props: Props) => {
  const { isCollapsed }: UiControlState = useSelector((state: RootState) => state.uiControl);
  const [selectedMenuItem, setSelectedMenuItem] = useState('board');
  const href = useLocation();

  useEffect(() => {
    setSelectedMenuItem(href.pathname.split('/')[2]);
  }, [href]);

  const itemsTop: MenuProps['items'] = [
    {
      label: <Link to='/project/12925'>Project board</Link>,
      key: 'board',
      icon: <LayoutOutlined className={styles.icon} />,
    },
    {
      label: <Link to='/project/create'>Create project</Link>,
      key: 'create',
      icon: <FileAddOutlined className={styles.icon} />,
    },
    {
      label: <Link to='/project'>Project management</Link>,
      key: 'projectManagement',
      icon: <ClusterOutlined className={styles.icon} />,
    },
    {
      label: <Link to='/users'>Users management</Link>,
      key: 'usersManagement',
      icon: <UserOutlined className={styles.icon} />,
    },
  ];

  const itemsBottom: MenuProps['items'] = [
    { label: 'Options', key: 'options', icon: <SettingOutlined className={styles.icon} /> },
  ];

  return (
    <div className={styles.sidebarWrapper}>
      <Layout.Sider
        className={styles.sidebar}
        collapsedWidth={80}
        width={210}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        style={{
          transition: 'all ease 0.2s',
        }}
      >
        <img
          className={styles.logo}
          src={require('../../assets/images/logo_jira.png')}
          alt='logo_jira'
        />

        <div className={styles.menu}>
          <Menu
            mode='inline'
            items={itemsTop}
            selectedKeys={[selectedMenuItem]}
            style={{ border: 'none' }}
          />

          <Menu
            mode='inline'
            items={itemsBottom}
            selectedKeys={[selectedMenuItem]}
            style={{ border: 'none' }}
          />
        </div>
      </Layout.Sider>
    </div>
  );
};

export default Sidebar;
