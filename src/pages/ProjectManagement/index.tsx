import {
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { InputRef } from 'antd';
import { AutoComplete, Avatar, Button, Input, Popconfirm, Popover, Space, Table, Tag, Tooltip } from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Card from 'components/Card';
import Heading from 'components/Heading';
import parse from 'html-react-parser';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { OptionsState } from 'redux/slices/optionsSlice';
import { Member, ProjectState } from 'redux/slices/projectSlice';
import { UsersState } from 'redux/slices/usersSlice';
import { projectThunk } from 'redux/thunks/projectThunk';
import { usersThunk } from 'redux/thunks/userThunk';
import styles from './styles.module.scss';

interface memeberDataType {
  id: number;
  avatar: string;
  title: string;
  action: any;
}

interface DataType {
  id: number;
  projectName: string;
  categoryName: string;
  categoryId: number;
  description: string;
  members: Member[];
}

type DataIndex = keyof DataType;

const breadCrumbList = [
  { href: '/', title: 'Home' },
  { href: '/project', title: 'Project' },
  { title: 'Project Management' },
];

type Props = {};

const ProjectManagement = (props: Props) => {
  const { getUserList }: UsersState = useSelector((state: RootState) => state.users);
  const { projectList }: ProjectState = useSelector((state: RootState) => state.project);
  const { projectCategoryList }: OptionsState = useSelector((state: RootState) => state.options);
  const dispatch = useAppDispatch();

  // state support to the delete member button in the popup table
  const [projectId, setProjectId] = useState(0);

  // state of feature which searches and adds a member
  const [searchValue, setSearchValue] = useState('');

  // table antd library
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(projectThunk.getAllProject());
  }, [dispatch]);

  const handleSearchMembers = _.debounce((value) => {
    dispatch(usersThunk.getuser(value));
  }, 500);

  // default handlers of a table antd library
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  // Remove member table
  const memberColumns: ColumnsType<Member> = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string) => <Avatar src={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record) => (
        <Button
          type='text'
          icon={<CloseCircleOutlined style={{ color: 'var(--error)' }} />}
          // fix
          // onClick={() => dispatch(removeUserProjectSagaAction(projectId, record.userId))}
        />
      ),
    },
  ];

  // Project management table
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      responsive: ['xl'],
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a?.id - b?.id,
      sortDirections: ['descend', 'ascend'],
      render: (text) => <span style={{ color: 'var(--sub-text-color)' }}>{text}</span>,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      ...getColumnSearchProps('projectName'),
      sorter: (a, b) => {
        const n1 = a?.projectName.trim().toLowerCase();
        const n2 = b?.projectName.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (text, record) => {
        return (
          <Link
            to={`/project/board/${record.id}`}
            style={{ cursor: 'pointer', fontWeight: '600' }}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
      responsive: ['xl'],
      sorter: (a, b) => {
        const n1 = a?.categoryName.trim().toLowerCase();
        const n2 = b?.categoryName.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      filters: projectCategoryList?.map((ctg) => ({ text: ctg.projectCategoryName, value: ctg.id })),
      onFilter: (value, record) => record.categoryId === value,
      render: (text) => {
        let color;
        switch (text) {
          case 'Dự án web':
            color = 'purple';
            break;
          case 'Dự án phần mềm':
            color = 'magenta';
            break;
          default:
            color = 'lime';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      responsive: ['md'],
      ...getColumnSearchProps('description'),
      sorter: (a, b) => {
        const n1 = a?.description.trim().toLowerCase();
        const n2 = b?.description.trim().toLowerCase();
        if (n1 < n2) {
          return -1;
        } else {
          return 1;
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (text) => {
        // description received from Editor tinyMCE is html
        return <span style={{ color: 'var(--sub-text-color)' }}>{parse(text)}</span>;
      },
    },
    {
      title: 'Member',
      dataIndex: 'members',
      key: 'members',
      width: 150,
      responsive: ['lg'],
      render: (text, record, index) => {
        return (
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            {/* member avatar list */}
            <Avatar.Group
              maxCount={2}
              maxStyle={{ backgroundColor: 'var(--bg-primary)' }}
            >
              {record.members?.map((m) => (
                <Tooltip
                  key={m.userId}
                  title={m.name}
                  placement='top'
                  color='cyan'
                >
                  <Avatar src={m.avatar} />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 200,
      render: (text, record, index) => (
        <Space>
          {/* edit button */}
          <Tooltip
            title={'Edit Project'}
            color='#00c292'
            zIndex={5}
          >
            <Button
              type='text'
              icon={<EditOutlined style={{ color: 'var(--success)' }} />}
              // fix
              // onClick={() => {
              //   // open drawer with edit content
              //   dispatch(
              //     setOffcanvas({
              //       title: 'Edit Project',
              //       icon: <EditOutlined />,
              //       aceptBtn: 'Edit',
              //       showBtn: true,
              //       offcanvasContent: <EditProjectForm />,
              //     })
              //   );
              //   // dispatch the editing project to store
              //   dispatch(setProjectEdit(record));
              // }}
            />
          </Tooltip>

          {/* remove button */}
          <Tooltip
            title={'Delete project'}
            color='#e46a76'
            zIndex={5}
          >
            <Popconfirm
              icon={
                <FontAwesomeIcon
                  icon={faCircleQuestion}
                  style={{ color: '#e46a76' }}
                />
              }
              title='Are you sure to remove this project?'
              okText='Remove'
              cancelText='Cancel'
              okButtonProps={{ style: { background: '#e46a76' } }}
              // fix
              // onConfirm={() => dispatch(deleteProjectSagaAction(record.id))}
            >
              <Button
                type='text'
                icon={<DeleteOutlined style={{ color: 'var(--error)' }} />}
              />
            </Popconfirm>
          </Tooltip>

          {/* add member button */}
          <Tooltip
            title={'Add member'}
            color='#03c9d7'
            zIndex={5}
          >
            <Popover
              content={() => (
                <AutoComplete
                  style={{
                    width: '100%',
                  }}
                  options={getUserList.map((u) => ({ label: u.name, value: u.userId.toString() }))}
                  value={searchValue}
                  placeholder='Insert name'
                  onChange={(keyword) => setSearchValue(keyword)}
                  onSearch={handleSearchMembers}
                  // fix
                  // onSelect={(value, option) => {
                  //   setSearchValue(option.label);
                  //   dispatch(assignUserProjectSagaAction(record.id, Number(value)));
                  // }}
                />
              )}
              title='Add member'
              trigger='click'
            >
              <Button
                type='text'
                icon={<PlusCircleOutlined style={{ color: 'var(--info)' }} />}
              />
            </Popover>
          </Tooltip>

          {/* remove member button */}
          <Tooltip
            title={'Remove member'}
            color='#fec90f'
            zIndex={5}
          >
            <Popover
              placement='left'
              content={() => (
                <Card style={{ padding: '0' }}>
                  <Table
                    columns={memberColumns}
                    dataSource={record.members}
                    rowKey={'userId'}
                    pagination={false}
                  />
                </Card>
              )}
              trigger='click'
            >
              <Button
                type='text'
                icon={<MinusCircleOutlined style={{ color: 'var(--warning)' }} />}
                onClick={() => setProjectId(record.id)}
              />
            </Popover>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.projectManagementWrapper}>
      <div className={styles.heading}>
        <Heading
          breadCrumbList={breadCrumbList}
          title={'Project Management'}
        />
      </div>

      {/* rowKey fix error 'child need key' */}
      <Card className={styles.card}>
        <Table
          columns={columns}
          dataSource={projectList}
          rowKey={'id'}
          pagination={{ position: ['bottomCenter'] }}
        />
      </Card>
    </div>
  );
};

export default ProjectManagement;
