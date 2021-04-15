import { IUser } from '../db';

export interface UserState {
  logInLoading: boolean;
  logInDone: boolean;
  logInError: any;
  logOutLoading: boolean;
  logOutDone: boolean;
  logOutError: any;
  signUpLoading: boolean;
  signUpDone: boolean;
  signUpError: any;
  removeFollowerLoading: boolean;
  removeFollowerDone: boolean;
  removeFollowerError: any;
  loadFollowingsLoading: boolean;
  loadFollowingsDone: boolean;
  loadFollowingsError: any;
  loadFollowersLoading: boolean;
  loadFollowersDone: boolean;
  loadFollowersError: any;
  loadMyInfoLoading: boolean;
  loadMyInfoDone: boolean;
  loadMyInfoError: any;
  loadUserInfoLoading: boolean;
  loadUserInfoDone: boolean;
  loadUserInfoError: any;
  followLoading: boolean;
  followDone: boolean;
  followError: any;
  unfollowLoading: boolean;
  unfollowDone: boolean;
  unfollowError: any;
  changeNicknameLoading: boolean;
  changeNicknameDone: boolean;
  changeNicknameError: any;

  me: IUser | null;
  userInfo: any;
}
