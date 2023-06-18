import { createAsyncThunk } from '@reduxjs/toolkit';

import { SignInFormValues } from 'pages/SingIn';
import { SignUpFormValues } from 'pages/SignUp';
import { User, UserLogin } from 'redux/slices/usersSlice';
import { usersService } from 'services/userService';

class UsersThunk {
  signUp = createAsyncThunk('users/signUpAPI', async (signUpFormValues: SignUpFormValues) => {
    const response = await usersService.signUp(signUpFormValues);
    return response?.data?.content;
  });

  signIn = createAsyncThunk('users/signInAPI', async (signInFormValues: SignInFormValues) => {
    const response = await usersService.signIn(signInFormValues);
    return response?.data?.content as UserLogin;
  });

  getuser = createAsyncThunk('users/getuserAPI', async (keyword: string) => {
    const response = await usersService.getuser(keyword);
    return response?.data?.content as User[];
  });
}

export const usersThunk = new UsersThunk();
