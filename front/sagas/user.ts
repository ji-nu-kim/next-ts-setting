import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypesUser,
  IChangeNicknameRequest,
  IFollowRequest,
  ILoadUserInfoRequest,
  ILogInRequest,
  IRemoveFollowerRequest,
  ISignUpRequest,
  IUnfollowRequest,
} from '../interfaces/user/userAction.interfaces';
import axios from 'axios';
import { IUser } from 'interfaces/db';

function loginAPI(data: { email: string; password: string }) {
  return axios.post('/user/login', data);
}

function* logIn(action: ILogInRequest) {
  try {
    const result: { data: IUser } = yield call(loginAPI, action.data);
    yield put({
      type: actionTypesUser.LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.LOG_IN_ERROR,
      error: error.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: actionTypesUser.LOG_OUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.LOG_OUT_ERROR,
      error: error.response.data,
    });
  }
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result: { data: IUser } = yield call(loadMyInfoAPI);
    yield put({
      type: actionTypesUser.LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.LOAD_MY_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function loadUserInfoAPI(data: { userId: number }) {
  return axios.get(`/user/${data.userId}`);
}

function* loadUserInfo(action: ILoadUserInfoRequest) {
  try {
    const result: {
      data: {
        id: number;
        nickname: string;
        email: string;
        Posts: number;
        Followings: number;
        Followers: number;
      };
    } = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: actionTypesUser.LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.LOAD_USER_INFO_ERROR,
      error: error.response.data,
    });
  }
}

function signUpAPI(data: {
  email: string;
  nickname: string;
  password: string;
}) {
  return axios.post('/user/signup', data);
}

function* signUp(action: ISignUpRequest) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: actionTypesUser.SIGN_UP_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.SIGN_UP_ERROR,
      error: error.response.data,
    });
  }
}

function followAPI(data: { userId: number }) {
  return axios.patch(`/user/${data.userId}/follow`);
}

function* follow(action: IFollowRequest) {
  try {
    const result: { data: { userId: number } } = yield call(
      followAPI,
      action.data
    );
    yield put({
      type: actionTypesUser.FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.FOLLOW_ERROR,
      error: error.response.data,
    });
  }
}

function unfollowAPI(data: { userId: number }) {
  return axios.delete(`/user/${data.userId}/follow`);
}

function* unfollow(action: IUnfollowRequest) {
  try {
    const result: { data: { userId: number } } = yield call(
      unfollowAPI,
      action.data
    );
    yield put({
      type: actionTypesUser.UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.UNFOLLOW_ERROR,
      error: error.response.data,
    });
  }
}

function loadFollowersAPI() {
  return axios.get('/user/followers');
}

function* loadFollowers() {
  try {
    const result: { data: { id: number; nickname: string } } = yield call(
      loadFollowersAPI
    );
    yield put({
      type: actionTypesUser.LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.LOAD_FOLLOWERS_ERROR,
      error: error.response.data,
    });
  }
}

function loadFollowingsAPI() {
  return axios.get('/user/followings');
}

function* loadFollowings() {
  try {
    const result: { data: { id: number; nickname: string } } = yield call(
      loadFollowingsAPI
    );
    yield put({
      type: actionTypesUser.LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.LOAD_FOLLOWINGS_ERROR,
      error: error.response.data,
    });
  }
}

function removeFollowerAPI(data: { userId: number }) {
  return axios.delete(`/user/follower/${data.userId}`);
}

function* removeFollower(action: IRemoveFollowerRequest) {
  try {
    const result: { data: { userId: number } } = yield call(
      removeFollowerAPI,
      action.data
    );
    yield put({
      type: actionTypesUser.REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.REMOVE_FOLLOWER_ERROR,
      error: error.response.data,
    });
  }
}

function changeNicknameAPI(data: { nickname: string }) {
  return axios.patch('/user/nickname', data);
}

function* changeNickname(action: IChangeNicknameRequest) {
  try {
    const result: { data: { nickname: string } } = yield call(
      changeNicknameAPI,
      action.data
    );
    yield put({
      type: actionTypesUser.CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesUser.CHANGE_NICKNAME_ERROR,
      error: error.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(actionTypesUser.LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(actionTypesUser.LOG_OUT_REQUEST, logOut);
}
function* watchLoadMyInfo() {
  yield takeLatest(actionTypesUser.LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadUserInfo() {
  yield takeLatest(actionTypesUser.LOAD_USER_INFO_REQUEST, loadUserInfo);
}
function* watchSignUp() {
  yield takeLatest(actionTypesUser.SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeLatest(actionTypesUser.FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(actionTypesUser.UNFOLLOW_REQUEST, unfollow);
}
function* watchLoadFollowers() {
  yield takeLatest(actionTypesUser.LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
  yield takeLatest(actionTypesUser.LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
function* watchremoveFollower() {
  yield takeLatest(actionTypesUser.REMOVE_FOLLOWER_REQUEST, removeFollower);
}
function* watchChangeNickname() {
  yield takeLatest(actionTypesUser.CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchLoadMyInfo),
    fork(watchLoadUserInfo),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchremoveFollower),
    fork(watchChangeNickname),
  ]);
}
