import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { projectThunk } from 'redux/thunks/projectThunk';

export type Project = {
  members: Member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
};

export type Creator = {
  id: number;
  name: string;
};

export type Member = {
  userId: number;
  name: string;
  avatar: string;
};

export type ProjectState = {
  projectList: Project[];
};

const initialState: ProjectState = {
  projectList: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllProject
      .addCase(
        projectThunk.getAllProject.fulfilled,
        (state: ProjectState, { payload: newProjectList }: PayloadAction<Project[]>) => {
          state.projectList = newProjectList;
        }
      );
  },
});

// export const {} = projectSlice.actions;

export default projectSlice.reducer;
