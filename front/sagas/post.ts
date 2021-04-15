import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  actionTypesPost,
  IAddCommentReqeust,
  IAddPostReqeust,
  ILikePostReqeust,
  ILoadHashtagPostsReqeust,
  ILoadPostReqeust,
  ILoadPostsReqeust,
  ILoadUserPostsReqeust,
  IRemovePostReqeust,
  IRetweetReqeust,
  IUnlikePostReqeust,
  IUpdatePostReqeust,
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

function updatePostAPI(data: { postId: number; content: string }) {
  console.log(data.content);
  return axios.patch(`/post/${data.postId}`, data);
}

function* updatePost(action: IUpdatePostReqeust) {
  try {
    const result: { data: { postId: number; content: string } } = yield call(
      updatePostAPI,
      action.data
    );
    yield put({
      type: actionTypesPost.UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.UPDATE_POST_ERROR,
      error: error.response.data,
    });
  }
}

function loadPostAPI(data: { postId: number }) {
  return axios.get(`/post/${data.postId}`);
}

function* loadPost(action: ILoadPostReqeust) {
  try {
    const result: { data: IPost } = yield call(loadPostAPI, action.data);
    yield put({
      type: actionTypesPost.LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.LOAD_POST_ERROR,
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

function loadUserPostsAPI(data: { postId: number; userId: number }) {
  return axios.get(`/user/${data.userId}/posts?lastId=${data.postId}`);
}

function* loadUserPosts(action: ILoadUserPostsReqeust) {
  try {
    const result: { data: IPost[] } = yield call(loadUserPostsAPI, action.data);
    yield put({
      type: actionTypesPost.LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.LOAD_USER_POSTS_ERROR,
      error: error.response.data,
    });
  }
}

function loadHashtagPostsAPI(data: { postId: number; hashtag: string }) {
  return axios.get(
    `/hashtag/${encodeURIComponent(data.hashtag)}?lastId=${data.postId}`
  );
}

function* loadHashtagPosts(action: ILoadHashtagPostsReqeust) {
  try {
    const result: { data: IPost[] } = yield call(
      loadHashtagPostsAPI,
      action.data
    );
    yield put({
      type: actionTypesPost.LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: actionTypesPost.LOAD_HASHTAG_POSTS_ERROR,
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

function* watchUpdatePost() {
  yield takeLatest(actionTypesPost.UPDATE_POST_REQUEST, updatePost);
}

function* watchLoadPost() {
  yield takeLatest(actionTypesPost.LOAD_POST_REQUEST, loadPost);
}

function* watchLoadPosts() {
  yield takeLatest(actionTypesPost.LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadUserPosts() {
  yield takeLatest(actionTypesPost.LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield takeLatest(
    actionTypesPost.LOAD_HASHTAG_POSTS_REQUEST,
    loadHashtagPosts
  );
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
    fork(watchUpdatePost),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchAddComment),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImages),
    fork(watchRetweet),
  ]);
}
