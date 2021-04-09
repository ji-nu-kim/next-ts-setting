import { IUser } from '../db';

export const actionTypesUser = {
  LOG_IN_REQUEST: 'LOG_IN_REQUEST',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_ERROR: 'LOG_IN_ERROR',
  LOG_OUT_REQUEST: 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS: 'LOG_OUT_SUCCESS',
  LOG_OUT_ERROR: 'LOG_OUT_ERROR',
  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  FOLLOW_REQUEST: 'FOLLOW_REQUEST',
  FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
  FOLLOW_ERROR: 'FOLLOW_ERROR',
  UNFOLLOW_REQUEST: 'UNFOLLOW_REQUEST',
  UNFOLLOW_SUCCESS: 'UNFOLLOW_SUCCESS',
  UNFOLLOW_ERROR: 'UNFOLLOW_ERROR',
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
  error: any;
}

export interface ILogOutRequest {
  type: typeof actionTypesUser.LOG_OUT_REQUEST;
}
export interface ILogOutSuccess {
  type: typeof actionTypesUser.LOG_OUT_SUCCESS;
}
export interface ILogOutError {
  type: typeof actionTypesUser.LOG_OUT_ERROR;
  error: any;
}

export interface ISignUpRequest {
  type: typeof actionTypesUser.SIGN_UP_REQUEST;
  data: { email: string; nickname: string; password: string };
}
export interface ISignUpSuccess {
  type: typeof actionTypesUser.SIGN_UP_SUCCESS;
}
export interface ISignUpError {
  type: typeof actionTypesUser.SIGN_UP_ERROR;
  error: any;
}

export interface IFollowRequest {
  type: typeof actionTypesUser.FOLLOW_REQUEST;
  data: { id: string; nickname: string };
}
export interface IFollowSuccess {
  type: typeof actionTypesUser.FOLLOW_SUCCESS;
  data: { id: string; nickname: string };
}
export interface IFollowError {
  type: typeof actionTypesUser.FOLLOW_ERROR;
  error: any;
}
export interface IUnfollowRequest {
  type: typeof actionTypesUser.UNFOLLOW_REQUEST;
  data: string;
}
export interface IUnfollowSuccess {
  type: typeof actionTypesUser.UNFOLLOW_SUCCESS;
  data: string;
}
export interface IUnfollowError {
  type: typeof actionTypesUser.UNFOLLOW_ERROR;
  error: any;
}

export interface IAddPostToMe {
  type: typeof actionTypesUser.ADD_POST_TO_ME;
  data: string;
}
export interface IRemovePostOfMe {
  type: typeof actionTypesUser.REMOVE_POST_OF_ME;
  data: string;
}

export type ActionsUser =
  | ILogInRequest
  | ILogInSuccess
  | ILogInError
  | ILogOutRequest
  | ILogOutSuccess
  | ILogOutError
  | ISignUpRequest
  | ISignUpSuccess
  | ISignUpError
  | IFollowRequest
  | IFollowSuccess
  | IFollowError
  | IUnfollowRequest
  | IUnfollowSuccess
  | IUnfollowError
  | IAddPostToMe
  | IRemovePostOfMe;
