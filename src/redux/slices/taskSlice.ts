import { createSlice } from '@reduxjs/toolkit';

interface taskState {
  taskDetail: any;
}

const initialState = {
  taskDetail: null,
} as taskState;

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
});

// export const {} = taskSlice.actions;

export default taskSlice.reducer;
