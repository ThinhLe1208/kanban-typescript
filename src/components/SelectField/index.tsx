import { Select } from 'antd';
import { useMemo } from 'react';

import { useAppDispatch } from 'redux/configureStore';
import { PriorityModel, ProjectCategoryModel, StatusModel, TaskTypeModel } from 'models/optionsModel';
import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  defaultValue: string;
  value?: string | number | undefined;
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
  value,
  list = [],
  listLabel,
  listValue,
  setFieldValue,
  api = false,
  taskDetail,
}: Props) => {
  const dispatch = useAppDispatch();

  const options = useMemo(() => {
    return list.map((option) => {
      return {
        label: option[listLabel],
        // type defaultValue antd does not include number ???
        value: String(option[listValue]),
      };
    });
  }, [list, listLabel, listValue]);

  // style tags in the select
  // const tagRender = (props) => {
  //   const { label, /* value , */ closable, onClose } = props;
  //   const onPreventMouseDown = (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };
  //   return (
  //     <Tag
  //       color='cyan'
  //       onMouseDown={onPreventMouseDown}
  //       closable={closable}
  //       onClose={onClose}
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         marginRight: 3,
  //       }}
  //     >
  //       {label}
  //     </Tag>
  //   );
  // };

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
    // const changeEvent: any = {
    //   target: {
    //     name,
    //     value,
    //   },
    // };
    // onChange(changeEvent);
  };

  const handleChange = (value: string) => {
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
