import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Col, Divider, Input, Row, Space } from 'antd';

import styles from './styles.module.scss';
import Comment from '../Comment';
import Card from 'components/Card';
import { RootState } from 'redux/configureStore';
import { commentThunk } from 'redux/thunks/comment';
import { CommentModel } from 'models/commentModel';

interface Props {
  taskDetail: any;
}

const CommentBoard = ({ taskDetail }: Props) => {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state: RootState) => state.users);
  const { commentList } = useSelector((state: RootState) => state.comment);
  const [isComment, setIsComment] = useState(false);
  const [contentComment, setContentComment] = useState('');

  useEffect(() => {
    // dispatch(commentThunk.getAll(taskDetail?.taskId))
  }, [dispatch]);

  const handleSendComment = () => {
    if (contentComment.trim().length !== 0) {
      // dispatch(insertCommentSagaAction(taskId, contentComment));
      setIsComment(false);
      setContentComment('');
    }
  };

  const renderCommentMessages = (list: CommentModel[]) => {
    if (Array.isArray(list)) {
      return list.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
        />
      ));
    }
  };

  return (
    <Card className={styles.wrapper}>
      <p className={styles.label}>Comments</p>

      <Row style={{ marginBottom: '20px' }}>
        <Col
          span={2}
          className={styles.leftSide}
        >
          <Avatar src={userLogin?.avatar} />
        </Col>
        <Col
          span={22}
          className={styles.rightSide}
        >
          <Input
            value={contentComment}
            placeholder='Add a comment...'
            onClick={() => setIsComment(true)}
            // onChange={(value) => setContentComment(value)}
          />
          {isComment && (
            <Space className={styles.commentBtns}>
              <Button
                type='primary'
                size='small'
                onClick={handleSendComment}
              >
                Send
              </Button>
              <Button
                type='text'
                size='small'
                onClick={() => {
                  setIsComment(false);
                  setContentComment('');
                }}
              >
                Cancel
              </Button>
            </Space>
          )}
        </Col>
      </Row>

      <Divider />

      {/* comment list */}
      {renderCommentMessages(commentList)}
    </Card>
  );
};

export default CommentBoard;
