import { Col, Row, Slider } from 'antd';

import { useAppDispatch } from 'redux/configureStore';
import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  spentValue: number;
  remainValue: number;
  disabled?: boolean;
  api?: boolean;
  taskDetail?: string;
}

const SliderField = ({ label, name, spentValue, remainValue, disabled = false, api = false, taskDetail }: Props) => {
  const dispatch = useAppDispatch();

  const handleChange = (value: number) => {
    if (api) {
      // dispatch(updateOriginalEstimateSagaAction(taskDetail.taskId, value, taskDetail.projectId));
    }
  };

  return (
    <div className={styles.wrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <Slider
        id={name}
        defaultValue={spentValue}
        value={spentValue}
        disabled={disabled}
        min={0}
        max={spentValue + remainValue}
        onChange={handleChange}
      />

      <Row>
        <Col span={12}>
          <p>{spentValue !== 0 ? `${spentValue}h logged` : 'No time logged'}</p>
        </Col>
        <Col span={12}>
          <p style={{ textAlign: 'right' }}>
            {remainValue ? `${remainValue}h remaining` : `${spentValue + remainValue}h estimated`}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default SliderField;
