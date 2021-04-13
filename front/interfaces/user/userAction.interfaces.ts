import { IUser } from '../db';

export const actionTypesUser = {
  LOG_IN_REQUEST: 'LOG_IN_REQUEST',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_ERROR: 'LOG_IN_ERROR',
  LOG_OUT_REQUEST: 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_ERROR: 'LOG_OUT_ERROR',
  LOAD_MY_INFO_REQUEST: 'LOAD_MY_INFO_REQUEST',
  LOAD_MY_INFO_SUCCESS: 'LOAD_MY_INFO_SUCCESS',
  LOAD_MY_INFO_ERROR: 'LOAD_MY_INFO_ERROR',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  FOLLOW_REQUEST: 'FOLLOW_REQUEST',
  FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
  FOLLOW_ERROR: 'FOLLOW_ERROR',
  UNFOLLOW_REQUEST: 'UNFOLLOW_REQUEST',
  UNFOLLOW_SUCCESS: 'UNFOLLOW_SUCCESS',
  UNFOLLOW_ERROR: 'UNFOLLOW_ERROR',
  LOAD_FOLLOWERS_REQUEST: 'LOAD_FOLLOWERS_REQUEST',
  LOAD_FOLLOWERS_SUCCESS: 'LOAD_FOLLOWERS_SUCCESS',
  LOAD_FOLLOWERS_ERROR: 'LOAD_FOLLOWERS_ERROR',
  LOAD_FOLLOWINGS_REQUEST: 'LOAD_FOLLOWINGS_REQUEST',
  LOAD_FOLLOWINGS_SUCCESS: 'LOAD_FOLLOWINGS_SUCCESS',
  LOAD_FOLLOWINGS_ERROR: 'LOAD_FOLLOWINGS_ERROR',
  REMOVE_FOLLOWER_REQUEST: 'REMOVE_FOLLOWER_REQUEST',
  REMOVE_FOLLOWER_SUCCESS: 'REMOVE_FOLLOWER_SUCCESS',
  REMOVE_FOLLOWER_ERROR: 'REMOVE_FOLLOWER_ERROR',
  CHANGE_NICKNAME_REQUEST: 'CHANGE_NICKNAME_REQUEST',
  CHANGE_NICKNAME_SUCCESS: 'CHANGE_NICKNAME_SUCCESS',
  CHANGE_NICKNAME_ERROR: 'CHANGE_NICKNAME_ERROR',
  ADD_POST_TO_ME: 'ADD_POST_TO_ME',
  REMOVE_POST_OF_ME: 'REMOVE_POST_OF_ME',
} as const;
export interface ILogInRequest {
  type: typeof actionTypesUser.LOG_IN_REQUEST;
  data: { email: string; password: string };
}
export interface ILogInSuccess {
  type: typeof actionTypesUser.LOG_IN_SUCCESS;
  data: IUser;
}
export interface ILogInError {
  type: typeof actionTypesUser.LOG_IN_ERROR;
  error: Error;
}
export interface ILogOutRequest {
  type: typeof actionTypesUser.LOG_OUT_REQUEST;
}
export interface ILogOutSuccess {
  type: typeof actionTypesUser.LOG_OUT_SUCCESS;
}
export interface ILogOutError {
  type: typeof actionTypesUser.LOG_OUT_ERROR;
  error: Error;
}

export interface ILoadMyInfoRequest {
  type: typeof actionTypesUser.LOAD_MY_INFO_REQUEST;
}
export interface ILoadMyInfoSuccess {
  type: typeof actionTypesUser.LOAD_MY_INFO_SUCCESS;
  data: IUser;
}
export interface ILoadMyInfoError {
  type: typeof actionTypesUser.LOAD_MY_INFO_ERROR;
  error: Error;
}

export interface ISignUpRequest {
  type: typeof actionTypesUser.SIGN_UP_REQUEST;
  data: { email: string; nickname: string; password: string };
}
export interface ISignUpSuccess {
  type: typeof actionTypesUser.SIGN_UP_SUCCESS;
  data: IUser;
}
export interface ISignUpError {
  type: typeof actionTypesUser.SIGN_UP_ERROR;
  error: Error;
}

export interface IFollowRequest {
  type: typeof actionTypesUser.FOLLOW_REQUEST;
  data: { userId: number };
}
export interface IFollowSuccess {
  type: typeof actionTypesUser.FOLLOW_SUCCESS;
  data: { userId: number };
}
export interface IFollowError {
  type: typeof actionTypesUser.FOLLOW_ERROR;
  error: Error;
}
export interface IUnfollowRequest {
  type: typeof actionTypesUser.UNFOLLOW_REQUEST;
  data: { userId: number };
}
export interface IUnfollowSuccess {
  type: typeof actionTypesUser.UNFOLLOW_SUCCESS;
  data: { userId: number };
}
export interface IUnfollowError {
  type: typeof actionTypesUser.UNFOLLOW_ERROR;
  error: Error;
}

export interface ILoadFollowersRequest {
  type: typeof actionTypesUser.LOAD_FOLLOWERS_REQUEST;
}
export interface ILoadFollowersSuccess {
  type: typeof actionTypesUser.LOAD_FOLLOWERS_SUCCESS;
  data: any;
}
export interface ILoadFollowersError {
  type: typeof actionTypesUser.LOAD_FOLLOWERS_ERROR;
  error: Error;
}
export interface ILoadFollowingsRequest {
  type: typeof actionTypesUser.LOAD_FOLLOWINGS_REQUEST;
}
export interface ILoadFollowingsSuccess {
  type: typeof actionTypesUser.LOAD_FOLLOWINGS_SUCCESS;
  data: any;
}
export interface ILoadFollowingsError {
  type: typeof actionTypesUser.LOAD_FOLLOWINGS_ERROR;
  error: Error;
}
export interface IRemoveFollowerRequest {
  type: typeof actionTypesUser.REMOVE_FOLLOWER_REQUEST;
  data: { userId: number };
}
export interface IRemoveFollowerSuccess {
  type: typeof actionTypesUser.REMOVE_FOLLOWER_SUCCESS;
  data: { userId: number };
}
export interface IRemoveFollowerError {
  type: typeof actionTypesUser.REMOVE_FOLLOWER_ERROR;
  error: Error;
}

export interface IChangeNicknameRequest {
  type: typeof actionTypesUser.CHANGE_NICKNAME_REQUEST;
  data: { nickname: string };
}
export interface IChangeNicknameSuccess {
  type: typeof actionTypesUser.CHANGE_NICKNAME_SUCCESS;
  data: { nickname: string };
}
export interface IChangeNicknameError {
  type: typeof actionTypesUser.CHANGE_NICKNAME_ERROR;
  error: Error;
}

export interface IAddPostToMe {
  type: typeof actionTypesUser.ADD_POST_TO_ME;
  data: number;
}
export interface IRemovePostOfMe {
  type: typeof actionTypesUser.REMOVE_POST_OF_ME;
  data: { postId: number };
}

export type ActionsUser =
  | ILogInRequest
  | ILogInSuccess
  | ILogInError
  | ILogOutRequest
  | ILogOutSuccess
  | ILogOutError
  | ILoadMyInfoRequest
  | ILoadMyInfoSuccess
  | ILoadMyInfoError
  | ISignUpRequest
  | ISignUpSuccess
  | ISignUpError
  | IFollowRequest
  | IFollowSuccess
  | IFollowError
  | IUnfollowRequest
  | IUnfollowSuccess
  | IUnfollowError
  | ILoadFollowersRequest
  | ILoadFollowersSuccess
  | ILoadFollowersError
  | ILoadFollowingsRequest
  | ILoadFollowingsSuccess
  | ILoadFollowingsError
  | IRemoveFollowerRequest
  | IRemoveFollowerSuccess
  | IRemoveFollowerError
  | IChangeNicknameRequest
  | IChangeNicknameSuccess
  | IChangeNicknameError
  | IAddPostToMe
  | IRemovePostOfMe;
