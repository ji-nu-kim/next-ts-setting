import { User } from './user.interfaces';

export const actionTypesUser = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
} as const;

export type ActionsUser = UserLogIn | UserLogout;

export interface UserLogIn {
  type: typeof actionTypesUser.LOG_IN;
  data: User;
}

export interface UserLogout {
  type: typeof actionTypesUser.LOG_OUT;
}
