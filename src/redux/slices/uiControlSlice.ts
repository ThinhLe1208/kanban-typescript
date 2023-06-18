import { createSlice } from '@reduxjs/toolkit';

export type UiControlState = {
  isLoading: boolean;
  isCollapsed: boolean;
};

const initialState: UiControlState = {
  isLoading: false,
  isCollapsed: true,
};

const uiControlSlice = createSlice({
  name: 'uiControl',
  initialState,
  reducers: {
    showLoading: (state: UiControlState) => {
      state.isLoading = true;
    },
    hideLoading: (state: UiControlState) => {
      state.isLoading = false;
    },
    setSidebar: (state: UiControlState) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { showLoading, hideLoading, setSidebar } = uiControlSlice.actions;

export default uiControlSlice.reducer;
