import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UpdatePiorityModel, UpdateStatusVM } from 'models/taskModel';
import { AppDispatch, RootState } from 'redux/configureStore';
import taskService from 'services/taskService';
import { projectThunk } from './projectThunk';

class TaskThunk {
  updateStatus = createAsyncThunk<
    string,
    UpdateStatusVM,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/updateStatus', async (updateStatus, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.updateStatus(updateStatus);
      return response?.data?.content;
    } catch (err) {
      console.log('TaskThunk ~ updatePriority=createAsyncThunk ~ err:', err);
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });

  updatePriority = createAsyncThunk<
    string,
    UpdatePiorityModel,
    {
      dispatch: AppDispatch;
      rejectValue: string;
      state: RootState;
    }
  >('task/updatePriority', async (updatePriority, { dispatch, rejectWithValue, getState }) => {
    try {
      const response = await taskService.updatePriority(updatePriority);
      console.log('TaskThunk ~ updatePriority=createAsyncThunk ~ response:', response);
      return response?.data?.content;
    } catch (err) {
      console.log('TaskThunk ~ updatePriority=createAsyncThunk ~ err:', err);
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.content);
      } else {
        return err;
      }
    } finally {
      const { projectDetail } = getState().project;
      if (projectDetail?.id) {
        dispatch(projectThunk.getProjectDetail(projectDetail.id));
      }
    }
  });
}

const taskThunk = new TaskThunk();
export default taskThunk;
