import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { projectThunk } from 'redux/thunks/projectThunk';

export interface UiControlState {
  isLoading: boolean;
  isCollapsed: boolean;
  isOpen: boolean;
  offcanvasId: number | undefined;
  handleSubmitOffcanvas: () => void;
}

const initialState = {
  isLoading: false,
  // the left sidebar
  isCollapsed: true,
  // the right offcanvas
  isOpen: false,
  offcanvasId: undefined,
  handleSubmitOffcanvas: () => {
    console.warn('Default handleSubmitOffcanvas');
  },
} as UiControlState;

const uiControlSlice = createSlice({
  name: 'uiControl',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    // the left sidebar
    setSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    // the right offcanvas
    showOffcanvas: (state) => {
      state.isOpen = true;
    },
    hideOffcanvas: (state) => {
      state.isOpen = false;
    },
    setOffcanvas: (state, { payload: id }: PayloadAction<number>) => {
      state.offcanvasId = id;
    },
    setHandleSubmitOffcanvas: (state, { payload: newHandleSubmitOffcanvas }: PayloadAction<() => void>) => {
      state.handleSubmitOffcanvas = newHandleSubmitOffcanvas;
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllProject
      .addCase(projectThunk.getAllProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(projectThunk.getAllProject.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(projectThunk.getAllProject.rejected, (state) => {
        state.isLoading = false;
      })
      // deleteProject
      .addCase(projectThunk.deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      // updateProject
      .addCase(projectThunk.updateProject.pending, (state) => {
        state.isLoading = true;
      })
      // assignUserProject
      .addCase(projectThunk.assignUserProject.pending, (state) => {
        state.isLoading = true;
      })
      // removeUserFromProject
      .addCase(projectThunk.removeUserFromProject.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const {
  showLoading,
  hideLoading,
  setSidebar,
  showOffcanvas,
  hideOffcanvas,
  setOffcanvas,
  setHandleSubmitOffcanvas,
} = uiControlSlice.actions;

export default uiControlSlice.reducer;
