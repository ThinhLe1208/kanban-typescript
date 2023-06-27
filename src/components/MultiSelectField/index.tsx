import type { SelectProps } from 'antd';
import { Select, Tag } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { useMemo } from 'react';

import { MemberDetailModel } from 'models/projectModel';
import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  defaultValue: string[] | number[];
  list: MemberDetailModel[] | undefined;
  listLabel: string;
  listValue: string;
  setFieldValue: any;
  placeholder?: string;
  api?: boolean;
  taskDetail?: string;
}

const MultiSelectField = ({
  label,
  name,
  defaultValue,
  list = [],
  listLabel,
  listValue,
  setFieldValue,
  placeholder,
  api = false,
  taskDetail,
}: Props) => {
  const options: SelectProps['options'] = useMemo(() => {
    if (Array.isArray(list)) {
      return list.map((option) => {
        return {
          label: option[listLabel],
          value: option[listValue],
        };
      });
    } else {
      return [];
    }
  }, [list, listLabel, listValue]);

  // style tags in the select
  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
        color='cyan'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const handleChange = (value: string[] | number[]) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.multiSelectFieldWrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>

      <Select
        className={styles.input}
        defaultValue={defaultValue}
        onChange={handleChange}
        options={options}
        placeholder={placeholder}
        tagRender={tagRender}
        mode='multiple'
        allowClear
        showSearch={false}
      />
    </div>
  );
};

export default MultiSelectField;
