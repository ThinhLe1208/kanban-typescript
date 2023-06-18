import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersThunk } from 'redux/thunks/userThunk';
import { USER_LOGIN } from 'util/constants/settingSystem';
import storage from 'util/storage';

// signin
export type UserLogin = {
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

export type UsersState = {
  userLogin: UserLogin | undefined;
  getUserList: User[];
  //   getUserByProjectId: [];
};

const initialState: UsersState = {
  userLogin: storage.getStorageJson(USER_LOGIN),
  getUserList: [],
  //   getUserByProjectId: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signIn
      .addCase(
        usersThunk.signIn.fulfilled,
        (state: UsersState, { payload: newUserLogin }: PayloadAction<UserLogin>) => {
          state.userLogin = newUserLogin;
        }
      )
      // getUser
      .addCase(
        usersThunk.getuser.fulfilled,
        (state: UsersState, { payload: newGetUserList }: PayloadAction<User[]>) => {
          state.getUserList = newGetUserList;
        }
      );
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
