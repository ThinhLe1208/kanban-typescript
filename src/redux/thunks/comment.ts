import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentModel } from 'models/commentModel';

import { commentService } from 'services/commentService';

class CommentThunk {
  getAll = createAsyncThunk('comment/getAll', async (taskId: number | undefined) => {
    const response = await commentService.getAll(taskId);
    return response?.data?.content as CommentModel[];
  });
}

export const commentThunk = new CommentThunk();
