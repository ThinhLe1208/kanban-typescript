import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { User, UserLoginModel } from 'redux/slices/usersSlice';
import { usersService } from 'services/userService';

// signup
export type UserJiraModel = {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
};

// signin
export type UserJiraLoginModel = {
  email: string;
  passWord: string;
};

class UsersThunk {
  signUp = createAsyncThunk<string, UserJiraModel, { rejectValue: string }>(
    'users/signUpAPI',
    async (signUpFormValues, { rejectWithValue }) => {
      try {
        const response = await usersService.signUp(signUpFormValues);
        return response?.data?.content;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return rejectWithValue(err.response?.data?.message);
        } else {
          console.error(err);
        }
      }
    }
  );

  signIn = createAsyncThunk<UserLoginModel, UserJiraLoginModel, { rejectValue: string }>(
    'users/signInAPI',
    async (signInFormValues, { rejectWithValue }) => {
      try {
        const response = await usersService.signIn(signInFormValues);
        return response?.data?.content;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          return rejectWithValue(err.response?.data?.message);
        } else {
          console.error(err);
        }
      }
    }
  );

  getuser = createAsyncThunk('users/getuserAPI', async (keyword: string) => {
    const response = await usersService.getuser(keyword);
    return response?.data?.content as User[];
    // let interceptors.response handles an error
  });
}

export const usersThunk = new UsersThunk();
