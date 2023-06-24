import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { projectThunk } from 'redux/thunks/projectThunk';

export type ProjectModel = {
  members: MemberModel[];
  creator: CreatorModel;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
};

export type CreatorModel = {
  id: number;
  name: string;
};

export type MemberModel = {
  userId: number;
  name: string;
  avatar: string;
};

export interface ProjectState {
  projectList: ProjectModel[];
  projectEdit: ProjectModel | undefined;
}

const initialState = {
  projectList: [],
  projectEdit: undefined,
} as ProjectState;

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjectEdit: (state: ProjectState, { payload: newProjectEdit }: PayloadAction<ProjectModel>) => {
      state.projectEdit = newProjectEdit;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllProject
      .addCase(
        projectThunk.getAllProject.fulfilled,
        (state, { payload: newProjectList }: PayloadAction<ProjectModel[]>) => {
          state.projectList = newProjectList;
        }
      );
  },
});

export const { setProjectEdit } = projectSlice.actions;

export default projectSlice.reducer;
