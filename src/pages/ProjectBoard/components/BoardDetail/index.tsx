import React from 'react';
import { Avatar, Col, Row, Tooltip } from 'antd';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { RootState } from 'redux/configureStore';
import { MemberModel } from 'models/projectModel';

interface Props {}

const BoardDetail = (props: Props) => {
  const { projectDetail } = useSelector((state: RootState) => state.project);

  const renderAvatars = (list: Array<MemberModel & { email: null; phoneNumber: null }> | undefined) => {
    if (Array.isArray(list)) {
      return list.map((member, index) => (
        <Tooltip
          key={index}
          title={member.name}
          placement='top'
        >
          <Avatar
            className={styles.avatar}
            src={member.avatar}
          />
        </Tooltip>
      ));
    }
  };

  return (
    <Row className={styles.boardDetailWrapper}>
      <Col className={styles.item}>
        <span className={styles.subDetail}>Create on:</span>
        <span className={styles.detail}>May 14,2022</span>
      </Col>

      <Col className={styles.item}>
        <span className={styles.subDetail}>Location:</span>
        <span className={styles.detail}>Viet Nam</span>
      </Col>

      <Col className={styles.item}>
        <span className={styles.subDetail}>Team:</span>
        <Avatar.Group className={styles.avatarGroup}>{renderAvatars(projectDetail?.members)}</Avatar.Group>
      </Col>
    </Row>
  );
};

export default BoardDetail;
