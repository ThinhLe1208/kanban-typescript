import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import OffcanvasTitle from 'components/OffcanvasTitle';
// import ProjectEditForm from 'components/ProjectEditForm';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { UiControlState, hideOffcanvas } from 'redux/slices/uiControlSlice';
import styles from './styles.module.scss';

interface offcanvasData {
  title: string;
  icon: JSX.Element | null;
  aceptBtnContent: string;
  showBtn: boolean;
  offcanvasContent: JSX.Element | null;
}

type Props = {};

const Offcanvas = (props: Props) => {
  const { isOpen, offcanvasId, handleSubmitOffcanvas }: UiControlState = useSelector(
    (state: RootState) => state.uiControl
  );
  const dispatch = useAppDispatch();
  const [data, setData] = useState<offcanvasData>({
    title: 'Default title',
    icon: null,
    showBtn: true,
    aceptBtnContent: 'Default button',
    offcanvasContent: null,
  });

  useEffect(() => {
    switch (offcanvasId) {
      case 0:
        setData({
          title: 'Edit Project',
          icon: <EditOutlined />,
          showBtn: true,
          aceptBtnContent: 'Edit',
          // offcanvasContent: <ProjectEditForm />,
          offcanvasContent: <p>123</p>,
        });
        break;
      default:
        console.warn('Default an offcanvas data.');
    }
  }, [offcanvasId]);

  const handlehideOffcanvas = () => {
    dispatch(hideOffcanvas());
  };

  return (
    <Drawer
      className={styles.offcanvasWrapper}
      title={
        <OffcanvasTitle icon={data?.icon}>
          <p>{data?.title}</p>
        </OffcanvasTitle>
      }
      width='auto'
      headerStyle={window.innerWidth < 576 ? { padding: '10px' } : { padding: '10px 20px' }}
      bodyStyle={{ padding: '0', backgroundColor: 'var(--grey)' }}
      closable={false}
      destroyOnClose={true}
      onClose={handlehideOffcanvas}
      open={isOpen}
      style={{ boxShadow: 'none' }}
      extra={
        data?.showBtn ? (
          <Space>
            <Button onClick={handlehideOffcanvas}>Cancel</Button>
            <Button
              type='primary'
              onClick={handleSubmitOffcanvas}
            >
              {data.aceptBtnContent}
            </Button>
          </Space>
        ) : (
          <div
            className={styles.closeBtn}
            onClick={handlehideOffcanvas}
          >
            <CloseOutlined />
          </div>
        )
      }
    >
      {data?.offcanvasContent}
    </Drawer>
  );
};

export default Offcanvas;