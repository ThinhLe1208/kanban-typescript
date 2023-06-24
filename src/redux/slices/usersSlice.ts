import { createSlice } from '@reduxjs/toolkit';

import { usersThunk } from 'redux/thunks/userThunk';
import { USER_LOGIN } from 'util/constants/settingSystem';
import storage from 'util/storage';

// signin
export type UserLoginModel = {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
  accessToken: string;
};

// getUser
export type User = {
  userId: number;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
};

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
