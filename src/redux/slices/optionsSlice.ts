import { createSlice } from '@reduxjs/toolkit';
import { optionsThunk } from 'redux/thunks/optionsThunk';

// getPriority
export type PriorityModel = {
  [key: string]: string | number | boolean;
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};

// getAllProjectCategory
export type ProjectCategoryModel = {
  [key: string]: string | number;
  id: number;
  projectCategoryName: string;
};

// getAllStatus
export type StatusModel = {
  [key: string]: string;
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
};

// getAllTaskType
export type TaskTypeModel = {
  [key: string]: string | number;
  id: number;
  taskType: string;
};

export interface OptionsState {
  priorityList: PriorityModel[];
  projectCategoryList: ProjectCategoryModel[];
  statusList: StatusModel[];
  taskTypeList: TaskTypeModel[];
}

const initialState = {
  priorityList: [],
  projectCategoryList: [],
  statusList: [],
  taskTypeList: [],
} as OptionsState;

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPriority
      .addCase(optionsThunk.getPriority.fulfilled, (state, { payload: newPriorityList }) => {
        state.priorityList = newPriorityList;
      })
      // getAllProjectCategory
      .addCase(optionsThunk.getAllProjectCategory.fulfilled, (state, { payload: newProjectCategoryList }) => {
        state.projectCategoryList = newProjectCategoryList;
      })
      // getAllStatus
      .addCase(optionsThunk.getAllStatus.fulfilled, (state, { payload: newStatusList }) => {
        state.statusList = newStatusList;
      })
      // getAllTaskType
      .addCase(optionsThunk.getAllTaskType.fulfilled, (state, { payload: newTaskTypeList }) => {
        state.taskTypeList = newTaskTypeList;
      });
  },
});

// export const {} = optionsSlice.actions;

export default optionsSlice.reducer;
