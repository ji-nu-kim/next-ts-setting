import { IUser } from '../interfaces/db';
import {
  actionTypesUser,
  ILogInRequest,
  ILogInSuccess,
  ILogInError,
  ILogOutRequest,
  ILogOutSuccess,
  ILogOutError,
  ILoadMyInfoRequest,
  ILoadMyInfoSuccess,
  ILoadMyInfoError,
  ILoadUserInfoRequest,
  ILoadUserInfoSuccess,
  ILoadUserInfoError,
  ISignUpRequest,
  ISignUpSuccess,
  ISignUpError,
  IFollowRequest,
  IFollowSuccess,
  IFollowError,
  IUnfollowRequest,
  IUnfollowSuccess,
  IUnfollowError,
  ILoadFollowersRequest,
  ILoadFollowersSuccess,
  ILoadFollowersError,
  ILoadFollowingsRequest,
  ILoadFollowingsSuccess,
  ILoadFollowingsError,
  IRemoveFollowerRequest,
  IRemoveFollowerSuccess,
  IRemoveFollowerError,
  IChangeNicknameRequest,
  IChangeNicknameSuccess,
  IChangeNicknameError,
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
export const loginErrorAction = (error: Error): ILogInError => {
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
export const logOutErrorAction = (error: Error): ILogOutError => {
  return {
    type: actionTypesUser.LOG_OUT_ERROR,
    error,
  };
};

export const loadMyInfoRequestAction = (): ILoadMyInfoRequest => {
  return {
    type: actionTypesUser.LOAD_MY_INFO_REQUEST,
  };
};
export const loadMyInfoSuccessAction = (data: IUser): ILoadMyInfoSuccess => {
  return {
    type: actionTypesUser.LOAD_MY_INFO_SUCCESS,
    data,
  };
};
export const loadMyInfoErrorAction = (error: Error): ILoadMyInfoError => {
  return {
    type: actionTypesUser.LOAD_MY_INFO_ERROR,
    error,
  };
};
export const loadUserInfoRequestAction = (data: {
  userId: number;
}): ILoadUserInfoRequest => {
  return {
    type: actionTypesUser.LOAD_USER_INFO_REQUEST,
    data,
  };
};
export const loadUserInfoSuccessAction = (data: {
  id: number;
  nickname: string;
  email: string;
  Posts: number;
  Followings: number;
  Followers: number;
}): ILoadUserInfoSuccess => {
  return {
    type: actionTypesUser.LOAD_USER_INFO_SUCCESS,
    data,
  };
};
export const loadUserInfoErrorAction = (error: Error): ILoadUserInfoError => {
  return {
    type: actionTypesUser.LOAD_USER_INFO_ERROR,
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
export const signUpErrorAction = (error: Error): ISignUpError => {
  return {
    type: actionTypesUser.SIGN_UP_ERROR,
    error,
  };
};

export const followRequestAction = (data: {
  userId: number;
}): IFollowRequest => {
  return {
    type: actionTypesUser.FOLLOW_REQUEST,
    data,
  };
};
export const followSuccessAction = (data: {
  userId: number;
}): IFollowSuccess => {
  return {
    type: actionTypesUser.FOLLOW_SUCCESS,
    data,
  };
};
export const followErrorAction = (error: Error): IFollowError => {
  return {
    type: actionTypesUser.FOLLOW_ERROR,
    error,
  };
};
export const unfollowRequestAction = (data: {
  userId: number;
}): IUnfollowRequest => {
  return {
    type: actionTypesUser.UNFOLLOW_REQUEST,
    data,
  };
};
export const unfollowSuccessAction = (data: {
  userId: number;
}): IUnfollowSuccess => {
  return {
    type: actionTypesUser.UNFOLLOW_SUCCESS,
    data,
  };
};
export const unfollowErrorAction = (error: Error): IUnfollowError => {
  return {
    type: actionTypesUser.UNFOLLOW_ERROR,
    error,
  };
};

export const loadFollowersRequestAction = (): ILoadFollowersRequest => {
  return {
    type: actionTypesUser.LOAD_FOLLOWERS_REQUEST,
  };
};
export const loadFollowersSuccessAction = (
  data: any
): ILoadFollowersSuccess => {
  return {
    type: actionTypesUser.LOAD_FOLLOWERS_SUCCESS,
    data,
  };
};
export const loadFollowersErrorAction = (error: Error): ILoadFollowersError => {
  return {
    type: actionTypesUser.LOAD_FOLLOWERS_ERROR,
    error,
  };
};
export const loadFollowingsRequestAction = (): ILoadFollowingsRequest => {
  return {
    type: actionTypesUser.LOAD_FOLLOWINGS_REQUEST,
  };
};
export const loadFollowingsSuccessAction = (
  data: any
): ILoadFollowingsSuccess => {
  return {
    type: actionTypesUser.LOAD_FOLLOWINGS_SUCCESS,
    data,
  };
};
export const loadFollowingsErrorAction = (
  error: Error
): ILoadFollowingsError => {
  return {
    type: actionTypesUser.LOAD_FOLLOWINGS_ERROR,
    error,
  };
};
export const removeFollowerRequestAction = (data: {
  userId: number;
}): IRemoveFollowerRequest => {
  return {
    type: actionTypesUser.REMOVE_FOLLOWER_REQUEST,
    data,
  };
};
export const removeFollowerSuccessAction = (data: {
  userId: number;
}): IRemoveFollowerSuccess => {
  return {
    type: actionTypesUser.REMOVE_FOLLOWER_SUCCESS,
    data,
  };
};
export const removeFollowerErrorAction = (
  error: Error
): IRemoveFollowerError => {
  return {
    type: actionTypesUser.REMOVE_FOLLOWER_ERROR,
    error,
  };
};

export const changeNicknameRequestAction = (data: {
  nickname: string;
}): IChangeNicknameRequest => {
  return {
    type: actionTypesUser.CHANGE_NICKNAME_REQUEST,
    data,
  };
};
export const changeNicknameSuccessAction = (data: {
  nickname: string;
}): IChangeNicknameSuccess => {
  return {
    type: actionTypesUser.CHANGE_NICKNAME_SUCCESS,
    data,
  };
};
export const changeNicknameErrorAction = (
  error: Error
): IChangeNicknameError => {
  return {
    type: actionTypesUser.CHANGE_NICKNAME_ERROR,
    error,
  };
};

export const addPostToMe = (data: number): IAddPostToMe => {
  return {
    type: actionTypesUser.ADD_POST_TO_ME,
    data,
  };
};
export const removePostOfMe = (data: { postId: number }): IRemovePostOfMe => {
  return {
    type: actionTypesUser.REMOVE_POST_OF_ME,
    data,
  };
};
