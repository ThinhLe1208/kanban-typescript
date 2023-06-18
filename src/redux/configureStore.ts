import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import optionsReducer from './slices/optionsSlice';
import uiControlReducer from './slices/uiControlSlice';
import usersReducer from './slices/usersSlice';
import projectReducer from './slices/projectSlice';

const store = configureStore({
  reducer: {
    users: usersReducer,
    uiControl: uiControlReducer,
    options: optionsReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
