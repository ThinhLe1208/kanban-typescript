import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';
import { Avatar, Tag, Tooltip } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Draggable } from 'react-beautiful-dnd';
import { AssignessModel, LstTaskDeTailModel } from 'models/projectModel';
import { useAppDispatch } from 'redux/configureStore';
// import { setOffcanvas } from 'redux/reducers/offcanvasReducer';
// import EditTaskForm from 'components/EditTaskForm';
// import { setTaskDetail } from 'redux/reducers/taskReducer';

interface Props {
  issue: LstTaskDeTailModel;
  index: number;
}

const Issue = ({ issue, index }: Props) => {
  const dispatch = useAppDispatch();
  const timeRef = useRef(Math.floor(Math.random() * 24 + 1));

  const renderAssigness = (list: AssignessModel[]) => {
    if (Array.isArray(list)) {
      return list.map((assignee, index) => (
        <Tooltip
          key={index}
          title={assignee.name}
          placement='top'
        >
          <Avatar
            className={styles.avatar}
            src={assignee.avatar}
          />
        </Tooltip>
      ));
    }
  };

  const handleClickIssue = () => {
    // dispatch(
    //   setOffcanvas({
    //     title: 'Detail Issue',
    //     icon: <FontAwesomeIcon icon={faFilePen} />,
    //     aceptBtn: '',
    //     showBtn: false,
    //     offcanvasContent: <EditTaskForm />,
    //   })
    // );
    // dispatch(setTaskDetail(issue));
  };

  const priority = () => {
    switch (issue?.priorityTask?.priorityId) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'green';
      case 4:
        return '';
      default:
    }
  };

  return (
    <Draggable
      // props of beautiful-dnd
      key={issue?.taskId}
      draggableId={issue?.taskId.toString()}
      index={index}
    >
      {(provided) => {
        return (
          <li
            className={styles.issueWrapper}
            onClick={handleClickIssue}
            data-toggle='modal'
            data-target='#infoModal'
            // props of beautiful-dnd
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {/* <Badge.Ribbon className={styles.tag")} text={issue?.priorityTask?.priority} color={priority()}> */}
            <div
              className={styles.issue}
              onClick={handleClickIssue}
            >
              <Tag
                className={styles.priority}
                color={priority()}
              >
                {issue?.priorityTask?.priority}
              </Tag>

              <Tag
                className={styles.type}
                color={issue.taskTypeDetail?.id === 1 ? 'red' : 'geekblue'}
              >
                {issue.taskTypeDetail?.taskType}
              </Tag>

              <p className={styles.name}>
                <span>Issue:</span>
                {issue?.taskName}
              </p>

              <div className={styles.content}>
                <p className={styles.time}>
                  <ClockCircleOutlined />
                  <span>{timeRef.current}</span>
                  <span>h ago</span>
                </p>

                <Avatar.Group
                  className={styles.assigneeGroup}
                  maxCount={3}
                >
                  {renderAssigness(issue?.assigness)}
                </Avatar.Group>
              </div>
            </div>
            {/* </Badge.Ribbon > */}
          </li>
        );
      }}
    </Draggable>
  );
};

export default Issue;
