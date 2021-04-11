import { IUser } from '../interfaces/db';
import {
  actionTypesUser,
  ILogInRequest,
  ILogInSuccess,
  ILogInError,
  ILogOutRequest,
  ILogOutSuccess,
  ILogOutError,
  ISignUpRequest,
  ISignUpSuccess,
  ISignUpError,
  IFollowRequest,
  IFollowSuccess,
  IFollowError,
  IUnfollowRequest,
  IUnfollowSuccess,
  IUnfollowError,
  IAddPostToMe,
  IRemovePostOfMe,
} from '../interfaces/user/userAction.interfaces';

export const loginRequestAction = (
  email: string,
  password: string
): ILogInRequest => {
  return {
    type: actionTypesUser.LOG_IN_REQUEST,
    data: { email, password },
  };
};
export const loginSuccessAction = (data: IUser): ILogInSuccess => {
  return {
    type: actionTypesUser.LOG_IN_SUCCESS,
    data,
  };
};
export const loginErrorAction = (error: any): ILogInError => {
  return {
    type: actionTypesUser.LOG_IN_ERROR,
    error,
  };
};

export const logOutRequestAction = (): ILogOutRequest => {
  return {
    type: actionTypesUser.LOG_OUT_REQUEST,
  };
};
export const logOutSuccessAction = (): ILogOutSuccess => {
  return {
    type: actionTypesUser.LOG_OUT_SUCCESS,
  };
};
export const logOutErrorAction = (error: any): ILogOutError => {
  return {
    type: actionTypesUser.LOG_OUT_ERROR,
    error,
  };
};

export const signUpRequestAction = (data: {
  email: string;
  nickname: string;
  password: string;
}): ISignUpRequest => {
  return {
    type: actionTypesUser.SIGN_UP_REQUEST,
    data,
  };
};
export const signUpSuccessAction = (data: IUser): ISignUpSuccess => {
  return {
    type: actionTypesUser.SIGN_UP_SUCCESS,
    data,
  };
};
export const signUpErrorAction = (error: any): ISignUpError => {
  return {
    type: actionTypesUser.SIGN_UP_ERROR,
    error,
  };
};

export const followRequestAction = (data: {
  id: string;
  nickname: string;
}): IFollowRequest => {
  return {
    type: actionTypesUser.FOLLOW_REQUEST,
    data,
  };
};
export const followSuccessAction = (data: {
  id: string;
  nickname: string;
}): IFollowSuccess => {
  return {
    type: actionTypesUser.FOLLOW_SUCCESS,
    data,
  };
};
export const followErrorAction = (error: any): IFollowError => {
  return {
    type: actionTypesUser.FOLLOW_ERROR,
    error,
  };
};
export const unfollowRequestAction = (data: string): IUnfollowRequest => {
  return {
    type: actionTypesUser.UNFOLLOW_REQUEST,
    data,
  };
};
export const unfollowSuccessAction = (data: string): IUnfollowSuccess => {
  return {
    type: actionTypesUser.UNFOLLOW_SUCCESS,
    data,
  };
};
export const unfollowErrorAction = (error: any): IUnfollowError => {
  return {
    type: actionTypesUser.UNFOLLOW_ERROR,
    error,
  };
};

export const addPostToMe = (data: string): IAddPostToMe => {
  return {
    type: actionTypesUser.ADD_POST_TO_ME,
    data,
  };
};
export const removePostOfMe = (data: string): IRemovePostOfMe => {
  return {
    type: actionTypesUser.REMOVE_POST_OF_ME,
    data,
  };
};
