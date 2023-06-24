import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

import EditorField from 'components/EditorField';
import InputField from 'components/InputField';
import SelectField from 'components/SelectField';
import { RootState, useAppDispatch } from 'redux/configureStore';
import styles from './styles.module.scss';
import { setHandleSubmitOffcanvas } from 'redux/slices/uiControlSlice';
import { ProjectUpdateModel } from 'redux/thunks/projectThunk';

interface valuesProjectEdit {
  projectName: string;
  description: string;
  categoryId: number;
}

const ProjectEditSchema = Yup.object().shape({
  projectName: Yup.string().required('Please provide an issue name.'),
});

interface Props {}

const ProjectEditForm = (props: Props) => {
  // const dispatch = useAppDispatch();

  // // get projectEdit from redux store
  // const { projectCategoryList } = useSelector((state: RootState) => state.options);
  // const projectEdit = useSelector((state: RootState) => state.project.projectEdit);

  // const initialValues: ProjectUpdateModel = useMemo(() => {
  //   return {
  //     projectName: projectEdit.projectName,
  //     description: projectEdit.description,
  //     categoryId: projectEdit.categoryId,
  //   };
  // }, [projectEdit]);

  // // Formik
  // const { values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue } = useFormik({
  //   enableReinitialize: true,
  //   initialValues: initialValues,
  //   validationSchema: ProjectEditSchema,
  //   onSubmit: (values: valuesProjectEdit) => {
  //     const updatedProject: ProjectUpdateModel = {
  //       ...values,
  //       id: projectEdit?.id as number,
  //       creator: 0,
  //     };
  //     // dispatch(updateProjectSagaAction(updatedProject));
  //   },
  // });

  // useEffect(() => {
  //   dispatch(setHandleSubmitOffcanvas(handleSubmit));
  // }, [dispatch, handleSubmit]);

  return (
    <div className={styles.projectEditFormWrapper}>
      {/* <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <InputField
            label='Project name'
            name='projectName'
            value={values.projectName}
            error={errors.projectName}
            touched={touched.projectName}
            placeholder='Insert project name'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.row}>
          <EditorField
            label='Desciption'
            name='description'
            height={250}
            value={values.description}
            setFieldValue={setFieldValue}
          />
        </div>

        <div className={styles.row}>
          <SelectField
            label='Project Category'
            name='categoryId'
            defaultValue='1'
            value={values.categoryId}
            list={projectCategoryList}
            listLabel='projectCategoryName'
            listValue='id'
            setFieldValue={setFieldValue}
          />
        </div>
      </form> */}
    </div>
  );
};

export default ProjectEditForm;
