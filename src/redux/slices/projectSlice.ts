import { createSlice } from '@reduxjs/toolkit';

import { ProjectDetailModel, ProjectModel, ProjectUpdateModel } from 'models/projectModel';
import { projectThunk } from 'redux/thunks/projectThunk';

export interface ProjectState {
  projectList: ProjectModel[];
  projectEdit: ProjectUpdateModel | null;
  projectDetail: ProjectDetailModel | null;
}

const initialState = {
  projectList: [],
  projectEdit: null,
  projectDetail: null,
} as ProjectState;

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setEditProject: (state, { payload: newEditProject }) => {
      state.projectEdit = newEditProject;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllProject
      .addCase(projectThunk.getAllProject.fulfilled, (state, { payload: newProjectList }) => {
        state.projectList = newProjectList;
      })
      // getProjectDetail
      .addCase(projectThunk.getProjectDetail.fulfilled, (state, { payload: newProjectDetail }) => {
        state.projectDetail = newProjectDetail;
      });
  },
});

export const { setEditProject } = projectSlice.actions;

export default projectSlice.reducer;
