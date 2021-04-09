import shortId from 'shortid';
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypesPost,
  IAddCommentReqeust,
  IAddPostReqeust,
  ILoadPostsReqeust,
  IRemovePostReqeust,
} from '../interfaces/post/postAction.interfaces';
import { actionTypesUser } from '../interfaces/user/userAction.interfaces';
import { generateDummyPost } from 'reducers/post';

function* addPost(action: IAddPostReqeust) {
  try {
    const id = shortId.generate();
    yield delay(1000);
    yield put({
      type: actionTypesPost.ADD_POST_SUCCESS,
      data: {
        postId: id,
        content: action.data.content,
        userId: action.data.userId,
      },
    });
    yield put({
      type: actionTypesUser.ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: actionTypesPost.ADD_POST_ERROR,
      error: err,
    });
  }
}

function* removePost(action: IRemovePostReqeust) {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesPost.REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: actionTypesUser.REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: actionTypesPost.REMOVE_POST_ERROR,
      error: err,
    });
  }
}

function* loadPosts(action: ILoadPostsReqeust) {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesPost.LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: actionTypesPost.LOAD_POSTS_ERROR,
      error: err,
    });
  }
}

function* addComment(action: IAddCommentReqeust) {
  try {
    yield delay(1000);
    yield put({
      type: actionTypesPost.ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: actionTypesPost.ADD_COMMENT_ERROR,
      error: err,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(actionTypesPost.ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(actionTypesPost.REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPosts() {
  yield takeLatest(actionTypesPost.LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddComment() {
  yield takeLatest(actionTypesPost.ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLoadPosts),
    fork(watchAddComment),
  ]);
}
