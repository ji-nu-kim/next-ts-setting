export interface User {
  id: string;
  password: string;
}

export interface UserState {
  isLoggedIn: boolean;
  me: User | null;
  signUpData: {};
  loginData: {};
}
