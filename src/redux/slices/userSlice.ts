import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { usersThunk } from 'redux/thunks/userThunk';
import { USER_LOGIN } from 'util/constants/settingSystem';
import storage from 'util/storage';

export type UserLogin = {
  id: number;
  email: string;
  avatar: string;
  phoneNumber: string;
  name: string;
  accessToken: string;
};

export type UsersState = {
  userLogin: UserLogin | undefined;
  //   getUser: [];
  //   getUserByProjectId: [];
};

// First approach: define the initial state using that type
const initialState: UsersState = {
  userLogin: storage.getStorageJson(USER_LOGIN),
  //   getUser: [],
  //   getUserByProjectId: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(usersThunk.signIn.fulfilled, (state: UsersState, { payload: userLogin }: PayloadAction<UserLogin>) => {
        state.userLogin = userLogin;
      });
  },
});

// export const {} = usersSlice.actions;

export default usersSlice.reducer;
