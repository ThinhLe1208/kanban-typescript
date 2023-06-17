import { SignInFormValues } from 'pages/SingIn';
import { SignUpFormValues } from 'pages/SignUp';
import { http } from './baseService';

class UsersService {
  signUp = (signUpFormValues: SignUpFormValues) => http.post('/api/Users/signup', signUpFormValues);

  signIn = (signInFormValues: SignInFormValues) => http.post('/api/Users/signin', signInFormValues);
}

export const usersService = new UsersService();
