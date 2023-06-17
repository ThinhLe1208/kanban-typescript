import { faBell, faMessage } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Button, Popover } from 'antd';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
// import { setSidebar } from 'redux/reducers/uiControlReducer';
import UserPopover from 'components/UserPopover';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { UsersState } from 'redux/slices/userSlice';

type Props = {};

const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  // const { isCollapsed } = useSelector((state) => state.uiControlReducer);
  const { userLogin }: UsersState = useSelector((state: RootState) => state.users);

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.leftSide}>
        <Button
          className={styles.sidebarBtn + ' ' + styles.iconBtn}
          type='text'
          // icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          // onClick={() => dispatch(setSidebar())}
        />
      </div>

      <div className={styles.rightSide}>
        <Button
          className={styles.sidebarBtn + ' ' + styles.iconBtn}
          type='text'
          icon={
            <Badge
              count={3}
              color='var(--info)'
              size='small'
              style={{ fontSize: '8px' }}
            >
              <FontAwesomeIcon
                icon={faMessage}
                className={styles.icon}
              />
            </Badge>
          }
        />

        <Button
          className={styles.sidebarBtn + ' ' + styles.iconBtn}
          type='text'
          icon={
            <Badge
              count={6}
              color='var(--error)'
              size='small'
              style={{ fontSize: '8px' }}
            >
              <FontAwesomeIcon
                icon={faBell}
                className={styles.icon}
              />
            </Badge>
          }
        />

        <div className={styles.divider} />

        <Popover
          content={<UserPopover userLogin={userLogin} />}
          trigger='click'
          placement='bottomRight'
        >
          <Button
            className={styles.userBtn}
            type='text'
          >
            <Avatar
              className={styles.avatar}
              src={userLogin?.avatar}
            />

            <span>
              Hi, <span className={styles.name}>{userLogin?.name}</span>
            </span>

            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
