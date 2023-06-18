import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { optionsThunk } from 'redux/thunks/optionsThunk';

export type Priority = {
  priorityId: number;
  priority: string;
  description: string;
  deleted: boolean;
  alias: string;
};

export type ProjectCategory = {
  id: number;
  projectCategoryName: string;
};

export type Status = {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
};

export type TaskType = {
  id: number;
  taskType: string;
};

export type OptionsState = {
  priorityList: Priority[];
  projectCategoryList: ProjectCategory[];
  statusList: Status[];
  taskTypeList: TaskType[];
};

const initialState: OptionsState = {
  priorityList: [],
  projectCategoryList: [],
  statusList: [],
  taskTypeList: [],
};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getPriority
      .addCase(
        optionsThunk.getPriority.fulfilled,
        (state: OptionsState, { payload: newPriorityList }: PayloadAction<Priority[]>) => {
          state.priorityList = newPriorityList;
        }
      )
      // getAllProjectCategory
      .addCase(
        optionsThunk.getAllProjectCategory.fulfilled,
        (state: OptionsState, { payload: newProjectCategoryList }: PayloadAction<ProjectCategory[]>) => {
          state.projectCategoryList = newProjectCategoryList;
        }
      )
      // getAllStatus
      .addCase(
        optionsThunk.getAllStatus.fulfilled,
        (state: OptionsState, { payload: newStatusList }: PayloadAction<Status[]>) => {
          state.statusList = newStatusList;
        }
      )
      // getAllTaskType
      .addCase(
        optionsThunk.getAllTaskType.fulfilled,
        (state: OptionsState, { payload: newTaskTypeList }: PayloadAction<TaskType[]>) => {
          state.taskTypeList = newTaskTypeList;
        }
      );
  },
});

// export const {} = optionsSlice.actions;

export default optionsSlice.reducer;
