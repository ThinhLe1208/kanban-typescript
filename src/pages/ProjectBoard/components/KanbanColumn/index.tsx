import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Dropdown, Space } from 'antd';
import { faEllipsis, faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faHardDrive, faPenToSquare, faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import type { MenuProps } from 'antd';

import styles from './styles.module.scss';
import { useAppDispatch } from 'redux/configureStore';
import { LstTaskDeTailModel, LstTaskModel } from 'models/projectModel';
import Issue from 'pages/ProjectBoard/components/Issue';
// import CreateTaskForm from 'components/CreateTaskForm';

interface Props {
  colDetail: LstTaskModel;
  index: number;
}

const KanbanColumn = ({ colDetail, index }: Props) => {
  const dispatch = useAppDispatch();

  const renderIssues = (list: LstTaskDeTailModel[]) => {
    if (Array.isArray(list)) {
      return colDetail?.lstTaskDeTail?.map((issue, index) => (
        <Issue
          key={index}
          issue={issue}
          index={index}
        />
      ));
    }
  };
  const handleClickAddIssueBtn = () => {
    // dispatch(
    //   setOffcanvas({
    //     title: 'Create Issue',
    //     icon: <FontAwesomeIcon icon={faFileCirclePlus} />,
    //     aceptBtn: 'Create',
    //     showBtn: true,
    //     offcanvasContent: <CreateTaskForm />,
    //   })
    // );
  };

  const headerStyle = () => {
    switch (index) {
      case 0:
        return 'var(--error)';
      case 1:
        return 'var(--success)';
      case 2:
        return 'var(--warning)';
      default:
        return 'var(--info)';
    }
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faPenToSquare} />
          <span>Rename list</span>
        </Space>
      ),
      key: '0',
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faStar} />
          <span>Add to favorites</span>
        </Space>
      ),
      key: '1',
    },
    {
      label: (
        <Space>
          <FontAwesomeIcon icon={faHardDrive} />
          <span>Archive list</span>
        </Space>
      ),
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Space style={{ color: '#e46a76' }}>
          <FontAwesomeIcon icon={faTrashCan} />
          <span>Remove</span>
        </Space>
      ),
      key: '4',
    },
  ];

  return (
    <Droppable
      // props of beautiful-dnd
      droppableId={colDetail?.statusId.toString()}
      key={colDetail?.statusId}
      // index={index}
      // className='bg-primary p-2'
      // style={{ minHeight: '500px' }}
    >
      {(provided) => {
        return (
          <div className={styles.kanbanColumWrapper}>
            <div
              className={styles.header}
              style={{ backgroundColor: headerStyle() }}
            >
              <div className={styles.leftSide}>
                <span className={styles.name}>{colDetail?.statusName}</span>
                <Badge
                  count={colDetail?.lstTaskDeTail?.length}
                  style={{ backgroundColor: headerStyle() }}
                />
              </div>

              <div className={styles.rightSide}>
                <Dropdown
                  menu={{ items }}
                  trigger={['click']}
                  placement='bottomLeft'
                >
                  <Button
                    type='text'
                    icon={
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        style={{ color: 'white' }}
                      />
                    }
                  />
                </Dropdown>
              </div>
            </div>

            <ul
              className={styles.issues}
              // props of beautiful-dnd
              key={colDetail?.statusId}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {renderIssues(colDetail?.lstTaskDeTail)}
              {provided.placeholder}
            </ul>

            <button
              className={styles.addIssueBtn}
              onClick={handleClickAddIssueBtn}
            >
              <PlusCircleOutlined style={{ marginRight: '6px' }} />
              Add another issue
            </button>
          </div>
        );
      }}
    </Droppable>
  );
};

export default KanbanColumn;