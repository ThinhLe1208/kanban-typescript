import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { AppDispatch } from 'redux/configureStore';
import { ProjectModel } from 'redux/slices/projectSlice';
import { projectService } from 'services/projectService';

// createProjectAuthorize
export type ProjectInsertModel = {
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
};

// updateProject
export type ProjectUpdateModel = {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: string;
};

// removeUserFromProject
export type UserProjectModel = {
  projectId: number;
  userId: number;
};

class ProjectThunk {
  createProjectAuthorize = createAsyncThunk<
    Omit<ProjectModel, 'members'>,
    ProjectInsertModel,
    {
      rejectValue: string;
    }
  >('project/createProjectAuthorize', async (projectInsert, { rejectWithValue }) => {
    try {
      const response = await projectService.createProjectAuthorize(projectInsert);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    }
  });

  getAllProject = createAsyncThunk('project/getAllProject', async (keyword: string | undefined) => {
    const response = await projectService.getAllProject(keyword);
    return response?.data?.content as ProjectModel[];
    // let interceptors.response handles an error
  });

  deleteProject = createAsyncThunk<
    string[],
    number,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/deleteProject', async (projectId, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.deleteProject(projectId);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });

  updateProject = createAsyncThunk('project/updateProject', async (projectUpdate: ProjectUpdateModel, { dispatch }) => {
    const response = await projectService.updateProject(projectUpdate);
    dispatch(this.getAllProject());
    return response?.data?.content;
  });

  assignUserProject = createAsyncThunk<
    string,
    UserProjectModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/assignUserProject', async (project, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.assignUserProject(project);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });

  removeUserFromProject = createAsyncThunk<
    string,
    UserProjectModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
    }
  >('project/removeUserFromProject', async (project, { dispatch, rejectWithValue }) => {
    try {
      const response = await projectService.removeUserFromProject(project);
      return response?.data?.content;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        console.error(err);
      }
    } finally {
      dispatch(this.getAllProject());
    }
  });
}

export const projectThunk = new ProjectThunk();
