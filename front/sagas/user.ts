import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypesUser,
  IFollowRequest,
  ILogInRequest,
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
    console.log(result);
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

function* logOut() {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesUser.LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: actionTypesUser.LOG_OUT_ERROR,
      error: err,
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

function* follow(action: IFollowRequest) {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesUser.FOLLOW_SUCCESS,
      data: {
        id: action.data.id,
        nickname: action.data.nickname,
      },
    });
  } catch (err) {
    yield put({
      type: actionTypesUser.FOLLOW_ERROR,
      error: err,
    });
  }
}
function* unfollow(action: IUnfollowRequest) {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesUser.UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: actionTypesUser.UNFOLLOW_ERROR,
      error: err,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(actionTypesUser.LOG_IN_REQUEST, logIn);
}
function* watchLogOut() {
  yield takeLatest(actionTypesUser.LOG_OUT_REQUEST, logOut);
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

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow),
  ]);
}
