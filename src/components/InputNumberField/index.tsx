import { InputNumber } from 'antd';

import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  defaultValue: number;
  setFieldValue: any;
  min?: number;
  max?: number;
}

const InputNumberField = ({ label, name, defaultValue = 0, setFieldValue, min, max }: Props) => {
  const handleChange = (value: number | null) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.inputNumberFieldWrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <InputNumber
        className={styles.input}
        name={name}
        id={name}
        defaultValue={defaultValue}
        onChange={handleChange}
        min={min}
        max={max}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default InputNumberField;
