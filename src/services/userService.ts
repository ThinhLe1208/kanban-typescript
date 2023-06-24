import { https } from './baseService';
import { UserJiraLoginModel, UserJiraModel } from 'redux/thunks/userThunk';

class UsersService {
  signUp = (signUpFormValues: UserJiraModel) => {
    let url = '/api/Users/signup';
    return https.post(url, signUpFormValues);
  };

  signIn = (signInFormValues: UserJiraLoginModel) => {
    let url = '/api/Users/signin';
    return https.post(url, signInFormValues);
  };

  getuser = (keyword: string) => {
    let url = '/api/Users/getUser';
    if (keyword) {
      url = `/api/Users/getUser?keyword=${keyword}`;
    }
    return https.get(url);
  };
}

export const usersService = new UsersService();
