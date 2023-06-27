import { Select } from 'antd';
import { useMemo } from 'react';

import { PriorityModel, ProjectCategoryModel, StatusModel, TaskTypeModel } from 'models/optionsModel';
import { useAppDispatch } from 'redux/configureStore';
import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  defaultValue: string | number;
  list: PriorityModel[] | ProjectCategoryModel[] | StatusModel[] | TaskTypeModel[];
  listLabel: string;
  listValue: string;
  setFieldValue: any;
  api?: boolean;
  taskDetail?: string;
}

const SelectField = ({
  label,
  name,
  defaultValue,
  list = [],
  listLabel,
  listValue,
  setFieldValue,
  api = false,
  taskDetail,
}: Props) => {
  const dispatch = useAppDispatch();

  const options = useMemo(() => {
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

  // antd handler doesnt give a event param so fake an event for a handler
  const customHandleChangeAntd = (value: number, name: string) => {
    if (api) {
      switch (name) {
        case 'statusId':
          // dispatch(updateStatusSagaAction(taskDetail.taskId, value, taskDetail.projectId));
          break;
        case 'priorityId':
          // dispatch(updatePrioritySagaAction(taskDetail.taskId, value, taskDetail.projectId));
          break;
        default:
      }
    }
  };

  const handleChange = (value: string | number) => {
    setFieldValue(name, value);
  };

  return (
    <div className={styles.selectFieldWrapper}>
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
      />
    </div>
  );
};

export default SelectField;
