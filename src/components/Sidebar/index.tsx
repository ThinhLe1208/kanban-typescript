import { ClusterOutlined, FileAddOutlined, LayoutOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {};

const Sidebar = (props: Props) => {
  // const { isCollapsed } = useSelector((state) => state.uiControlReducer);
  const [selectedItem, setSelectedItem] = useState('board');
  const href = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedItem(href.pathname.split('/')[2]);
  }, [href]);

  const itemsTop: MenuProps['items'] = [
    { label: 'Project board', key: 'board', icon: <LayoutOutlined className={styles.icon} /> },
    { label: 'Create project', key: 'create', icon: <FileAddOutlined className={styles.icon} /> },
    { label: 'Project management', key: 'management', icon: <ClusterOutlined className={styles.icon} /> },
  ];

  const itemsBottom: MenuProps['items'] = [
    { label: 'Options', key: 'options', icon: <SettingOutlined className={styles.icon} /> },
  ];

  const handleClickMenuItem: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'board': {
        navigate('board/12464');
        break;
      }
      case 'create': {
        navigate('create');
        break;
      }
      case 'management': {
        navigate('management');
        break;
      }
      default: {
        console.warn('Default handleClickMenuItem');
      }
    }
  };

  return (
    <div className={styles.sidebarWrapper}>
      <Layout.Sider
        className={styles.sidebar}
        collapsedWidth={80}
        width={210}
        trigger={null}
        collapsible
        // collapsed={isCollapsed}
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
            selectedKeys={[selectedItem]}
            onClick={handleClickMenuItem}
            style={{ border: 'none' }}
          />

          <Menu
            mode='inline'
            items={itemsBottom}
            selectedKeys={[selectedItem]}
            onClick={handleClickMenuItem}
            style={{ border: 'none' }}
          />
        </div>
      </Layout.Sider>
    </div>
  );
};

export default Sidebar;
