import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypesUser,
  IFollowRequest,
  ILogInRequest,
  IUnfollowRequest,
} from '../interfaces/user/userAction.interfaces';
import shortId from 'shortid';

function* logIn(action: ILogInRequest) {
  try {
    const userInfo = {
      email: action.data.email,
      nickname: '바트심슨',
      id: shortId.generate(),
      Posts: [],
      Followings: [],
      Followers: [],
    };
    yield delay(1000);
    yield put({
      type: actionTypesUser.LOG_IN_SUCCESS,
      data: userInfo,
    });
  } catch (err) {
    yield put({
      type: actionTypesUser.LOG_IN_ERROR,
      error: err,
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
function* signUp() {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesUser.SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: actionTypesUser.SIGN_UP_ERROR,
      error: err,
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
