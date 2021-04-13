import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypesPost,
  IAddCommentReqeust,
  IAddPostReqeust,
  ILikePostReqeust,
  ILoadPostsReqeust,
  IRemovePostReqeust,
  IRetweetReqeust,
  IUnlikePostReqeust,
  IUploadImagesReqeust,
} from '../interfaces/post/postAction.interfaces';
import { actionTypesUser } from '../interfaces/user/userAction.interfaces';
import axios from 'axios';
import { IComment, ICommentProps, IPost } from 'interfaces/db';

function postAPI(data: FormData) {
  return axios.post('/post', data);
}

function* addPost(action: IAddPostReqeust) {
  try {
    const result: { data: IPost } = yield call(postAPI, action.data);
    yield put({
      type: actionTypesPost.ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: actionTypesUser.ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.ADD_POST_ERROR,
      error: error.response.data,
    });
  }
}

function removePostAPI(data: { postId: number }) {
  return axios.delete(`/post/${data.postId}`);
}

function* removePost(action: IRemovePostReqeust) {
  try {
    const result: { data: number } = yield call(removePostAPI, action.data);
    yield put({
      type: actionTypesPost.REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: actionTypesUser.REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.REMOVE_POST_ERROR,
      error: error.response.data,
    });
  }
}

function loadPostsAPI(data: { postId: number }) {
  return axios.get(`/posts?lastId=${data.postId}`);
}

function* loadPosts(action: ILoadPostsReqeust) {
  try {
    const result: { data: IPost[] } = yield call(loadPostsAPI, action.data);
    yield put({
      type: actionTypesPost.LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.LOAD_POSTS_ERROR,
      error: error.response.data,
    });
  }
}

function addCommentAPI(data: ICommentProps) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action: IAddCommentReqeust) {
  try {
    const result: { data: IComment } = yield call(addCommentAPI, action.data);
    yield put({
      type: actionTypesPost.ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.ADD_COMMENT_ERROR,
      error: error.response.data,
    });
  }
}

function likePostAPI(data: { postId: number }) {
  return axios.patch(`/post/${data.postId}/like`);
}

function* likePost(action: ILikePostReqeust) {
  try {
    const result: { data: { postId: number; userId: number } } = yield call(
      likePostAPI,
      action.data
    );
    yield put({
      type: actionTypesPost.LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.LIKE_POST_ERROR,
      error: error.response.data,
    });
  }
}

function unlikePostAPI(data: { postId: number }) {
  return axios.delete(`/post/${data.postId}/like`);
}

function* unlikePost(action: IUnlikePostReqeust) {
  try {
    const result: { data: { postId: number; userId: number } } = yield call(
      unlikePostAPI,
      action.data
    );
    yield put({
      type: actionTypesPost.UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.UNLIKE_POST_ERROR,
      error: error.response.data,
    });
  }
}

function uploadImagesAPI(data: FormData) {
  return axios.post('/post/images', data);
}

function* uploadImages(action: IUploadImagesReqeust) {
  try {
    const result: { data: string[] } = yield call(uploadImagesAPI, action.data);
    yield put({
      type: actionTypesPost.UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.UPLOAD_IMAGES_ERROR,
      error: error.response.data,
    });
  }
}

function retweetAPI(data: { postId: number }) {
  return axios.post(`/post/${data.postId}/retweet`);
}

function* retweet(action: IRetweetReqeust) {
  try {
    const result: { data: IPost } = yield call(retweetAPI, action.data);
    yield put({
      type: actionTypesPost.RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.RETWEET_ERROR,
      error: error.response.data,
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

function* watchLikePost() {
  yield takeLatest(actionTypesPost.LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(actionTypesPost.UNLIKE_POST_REQUEST, unlikePost);
}

function* watchUploadImages() {
  yield takeLatest(actionTypesPost.UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(actionTypesPost.RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLoadPosts),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}
