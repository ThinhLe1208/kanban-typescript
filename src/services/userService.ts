import { SignInFormValues } from 'pages/SingIn';
import { SignUpFormValues } from 'pages/SignUp';
import { https } from './baseService';

class UsersService {
  signUp = (signUpFormValues: SignUpFormValues) => https.post('/api/Users/signup', signUpFormValues);

  signIn = (signInFormValues: SignInFormValues) => https.post('/api/Users/signin', signInFormValues);

  getuser = (keyword: string) => {
    let url = '/api/Users/getUser';
    if (keyword) {
      url = `/api/Users/getUser?keyword=${keyword}`;
    }
    return https.get(url);
  };
}

export const usersService = new UsersService();
