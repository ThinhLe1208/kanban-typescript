import { createAsyncThunk } from '@reduxjs/toolkit';

import { Priority, ProjectCategory, Status, TaskType } from 'redux/slices/optionsSlice';
import { optionsService } from 'services/optionsService';

class OptionsThunk {
  getPriority = createAsyncThunk('options/getPriority', async (id: number | undefined) => {
    const response = await optionsService.getPriority(id);
    return response?.data?.content as Priority[];
  });

  getAllProjectCategory = createAsyncThunk('options/getAllProjectCategory', async () => {
    const response = await optionsService.getAllProjectCategory();
    return response?.data?.content as ProjectCategory[];
  });

  getAllStatus = createAsyncThunk('options/getAllStatus', async () => {
    const response = await optionsService.getAllStatus();
    return response?.data?.content as Status[];
  });

  getAllTaskType = createAsyncThunk('options/getAllTaskType', async () => {
    const response = await optionsService.getAllTaskType();
    return response?.data?.content as TaskType[];
  });
}

export const optionsThunk = new OptionsThunk();
