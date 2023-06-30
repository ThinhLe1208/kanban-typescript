import { UserJiraLoginModel, UserJiraModel, UserJiraModelUpdateModel } from 'models/usersModel';
import { https } from './baseService';

class UsersService {
  signUp = (signUpFormValues: UserJiraModel) => {
    let url = '/api/Users/signup';
    return https.post(url, signUpFormValues);
  };

  signIn = (signInFormValues: UserJiraLoginModel) => {
    let url = '/api/Users/signin';
    return https.post(url, signInFormValues);
  };

  getuser = (keyword: string | undefined) => {
    let url = '/api/Users/getUser';
    if (keyword) {
      url = `/api/Users/getUser?keyword=${keyword}`;
    }
    return https.get(url);
  };

  editUser = (editUser: UserJiraModelUpdateModel) => {
    let url = '/api/Users/editUser';
    return https.put(url, editUser);
  };
}

export const usersService = new UsersService();
