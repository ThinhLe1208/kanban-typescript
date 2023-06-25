import { createSlice } from '@reduxjs/toolkit';

import { User, UserLoginModel } from 'models/usersModel';
import { usersThunk } from 'redux/thunks/userThunk';
import { USER_LOGIN } from 'utils/constants/settingSystem';
import storage from 'utils/storage';

export interface UsersState {
  userLogin: UserLoginModel | undefined;
  getUserList: User[];
  //   getUserByProjectId: [];
}

const initialState = {
  userLogin: storage.getStorageJson(USER_LOGIN),
  getUserList: [],
  //   getUserByProjectId: [],
} as UsersState;

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signIn
      .addCase(usersThunk.signIn.fulfilled, (state, { payload: newUserLogin }) => {
        state.userLogin = newUserLogin;
      })
      // getUser
      .addCase(usersThunk.getuser.fulfilled, (state, { payload: newGetUserList }) => {
        state.getUserList = newGetUserList;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
