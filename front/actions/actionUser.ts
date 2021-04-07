import { User } from '@interfaces/user/user.interfaces';
import {
  actionTypesUser,
  UserLogIn,
  UserLogout,
} from '../interfaces/user/userAction.interfaces';

export const loginAction = (data: User): UserLogIn => {
  return {
    type: actionTypesUser.LOG_IN,
    data,
  };
};

export const logoutAction = (): UserLogout => {
  return {
    type: actionTypesUser.LOG_OUT,
  };
};
