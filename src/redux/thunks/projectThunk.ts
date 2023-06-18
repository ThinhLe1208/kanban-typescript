import { createAsyncThunk } from '@reduxjs/toolkit';

import { Project } from 'redux/slices/projectSlice';
import { projectService } from 'services/projectService';

class ProjectThunk {
  getAllProject = createAsyncThunk('project/getAllProject', async (keyword: string | undefined) => {
    const response = await projectService.getAllProject(keyword);
    return response?.data?.content as Project[];
  });
}

export const projectThunk = new ProjectThunk();
