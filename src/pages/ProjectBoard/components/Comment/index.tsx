import { Avatar, Button, Col, Input, Row } from 'antd';
import { useRef, useState } from 'react';

import Card from 'components/Card';
import { useAppDispatch } from 'redux/configureStore';
import styles from './styles.module.scss';

interface Props {
  comment: any;
}

const Comment = ({ comment }: Props) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment?.contentComment);
  // random comment generation time
  const timeRef = useRef(Math.floor(Math.random() * 24 + 1));

  const handleUpdateComment = () => {
    // dispatch(updateCommentSagaAction(comment?.id, updatedComment));
    setIsEdit(false);
  };

  const handleEditComment = () => {
    setIsEdit(true);
    setUpdatedComment(comment?.contentComment);
  };

  const handleDeleteComment = () => {
    // dispatch(deleteCommentSagaAction(comment?.id, comment?.taskId));
  };

  return (
    <div className={styles.commentWrapper}>
      <Row>
        <Col
          span={2}
          className={styles.leftSide}
        >
          <Avatar src={comment?.user?.avatar} />
        </Col>

        <Col span={22}>
          <div className={styles.rightSide}>
            <p className={styles.useName}>
              {comment?.user?.name}
              <span className={styles.time}>{timeRef.current} hours ago</span>
            </p>

            {isEdit ? (
              <>
                <div style={{ padding: '8px 0', width: '100%' }}>
                  <Input
                    value={updatedComment}
                    onChange={(value) => setUpdatedComment(value)}
                    style={{ width: '100%' }}
                  />
                </div>
                <div className={styles.buttons}>
                  <Button
                    type='primary'
                    size='small'
                    onClick={handleUpdateComment}
                  >
                    Save
                  </Button>
                  <Button
                    type='text'
                    size='small'
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card className={styles.contentMess}>{comment?.contentComment}</Card>
                <div className={styles.buttons}>
                  <Button
                    type='text'
                    size='small'
                    onClick={handleEditComment}
                  >
                    <u>Edit</u>
                  </Button>
                  <Button
                    type='text'
                    size='small'
                    onClick={handleDeleteComment}
                  >
                    <u>Delete</u>
                  </Button>
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Comment;
