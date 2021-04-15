import { IComment, ICommentProps, IPost } from '../db';

export const actionTypesPost = {
  ADD_POST_REQUEST: 'ADD_POST_REQUEST',
  ADD_POST_SUCCESS: 'ADD_POST_SUCCESS',
  ADD_POST_ERROR: 'ADD_POST_ERROR',
  REMOVE_POST_REQUEST: 'REMOVE_POST_REQUEST',
  REMOVE_POST_SUCCESS: 'REMOVE_POST_SUCCESS',
  REMOVE_POST_ERROR: 'REMOVE_POST_ERROR',
  ADD_COMMENT_REQUEST: 'ADD_COMMENT_REQUEST',
  ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
  ADD_COMMENT_ERROR: 'ADD_COMMENT_ERROR',
  LOAD_POST_REQUEST: 'LOAD_POST_REQUEST',
  LOAD_POST_SUCCESS: 'LOAD_POST_SUCCESS',
  LOAD_POST_ERROR: 'LOAD_POST_ERROR',
  LOAD_POSTS_REQUEST: 'LOAD_POSTS_REQUEST',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
  LOAD_POSTS_ERROR: 'LOAD_POSTS_ERROR',
  LOAD_USER_POSTS_REQUEST: 'LOAD_USER_POSTS_REQUEST',
  LOAD_USER_POSTS_SUCCESS: 'LOAD_USER_POSTS_SUCCESS',
  LOAD_USER_POSTS_ERROR: 'LOAD_USER_POSTS_ERROR',
  LOAD_HASHTAG_POSTS_REQUEST: 'LOAD_HASHTAG_POSTS_REQUEST',
  LOAD_HASHTAG_POSTS_SUCCESS: 'LOAD_HASHTAG_POSTS_SUCCESS',
  LOAD_HASHTAG_POSTS_ERROR: 'LOAD_HASHTAG_POSTS_ERROR',
  LIKE_POST_REQUEST: 'LIKE_POST_REQUEST',
  LIKE_POST_SUCCESS: 'LIKE_POST_SUCCESS',
  LIKE_POST_ERROR: 'LIKE_POST_ERROR',
  UNLIKE_POST_REQUEST: 'UNLIKE_POST_REQUEST',
  UNLIKE_POST_SUCCESS: 'UNLIKE_POST_SUCCESS',
  UNLIKE_POST_ERROR: 'UNLIKE_POST_ERROR',
  UPLOAD_IMAGES_REQUEST: 'UPLOAD_IMAGES_REQUEST',
  UPLOAD_IMAGES_SUCCESS: 'UPLOAD_IMAGES_SUCCESS',
  UPLOAD_IMAGES_ERROR: 'UPLOAD_IMAGES_ERROR',
  RETWEET_REQUEST: 'RETWEET_REQUEST',
  RETWEET_SUCCESS: 'RETWEET_SUCCESS',
  RETWEET_ERROR: 'RETWEET_ERROR',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
} as const;

export interface IAddPostReqeust {
  type: typeof actionTypesPost.ADD_POST_REQUEST;
  data: FormData;
}
export interface IAddPostSuccess {
  type: typeof actionTypesPost.ADD_POST_SUCCESS;
  data: IPost;
}
export interface IAddPostError {
  type: typeof actionTypesPost.ADD_POST_ERROR;
  error: Error;
}
export interface IRemovePostReqeust {
  type: typeof actionTypesPost.REMOVE_POST_REQUEST;
  data: { postId: number };
}
export interface IRemovePostSuccess {
  type: typeof actionTypesPost.REMOVE_POST_SUCCESS;
  data: { postId: number };
}
export interface IRemovePostError {
  type: typeof actionTypesPost.REMOVE_POST_ERROR;
  error: Error;
}

export interface ILoadPostReqeust {
  type: typeof actionTypesPost.LOAD_POST_REQUEST;
  data: { postId: number };
}
export interface ILoadPostSuccess {
  type: typeof actionTypesPost.LOAD_POST_SUCCESS;
  data: IPost;
}
export interface ILoadPostError {
  type: typeof actionTypesPost.LOAD_POST_ERROR;
  error: Error;
}
export interface ILoadPostsReqeust {
  type: typeof actionTypesPost.LOAD_POSTS_REQUEST;
  data: { postId: number };
}
export interface ILoadPostsSuccess {
  type: typeof actionTypesPost.LOAD_POSTS_SUCCESS;
  data: IPost[];
}
export interface ILoadPostsError {
  type: typeof actionTypesPost.LOAD_POSTS_ERROR;
  error: Error;
}
export interface ILoadUserPostsReqeust {
  type: typeof actionTypesPost.LOAD_USER_POSTS_REQUEST;
  data: { postId: number; userId: number };
}
export interface ILoadUserPostsSuccess {
  type: typeof actionTypesPost.LOAD_USER_POSTS_SUCCESS;
  data: IPost[];
}
export interface ILoadUserPostsError {
  type: typeof actionTypesPost.LOAD_USER_POSTS_ERROR;
  error: Error;
}
export interface ILoadHashtagPostsReqeust {
  type: typeof actionTypesPost.LOAD_HASHTAG_POSTS_REQUEST;
  data: { postId: number; hashtag: string };
}
export interface ILoadHashtagPostsSuccess {
  type: typeof actionTypesPost.LOAD_HASHTAG_POSTS_SUCCESS;
  data: IPost[];
}
export interface ILoadHashtagPostsError {
  type: typeof actionTypesPost.LOAD_HASHTAG_POSTS_ERROR;
  error: Error;
}

export interface IAddCommentReqeust {
  type: typeof actionTypesPost.ADD_COMMENT_REQUEST;
  data: ICommentProps;
}
export interface IAddCommentSuccess {
  type: typeof actionTypesPost.ADD_COMMENT_SUCCESS;
  data: IComment;
}
export interface IAddCommentError {
  type: typeof actionTypesPost.ADD_COMMENT_ERROR;
  error: Error;
}

export interface ILikePostReqeust {
  type: typeof actionTypesPost.LIKE_POST_REQUEST;
  data: { postId: number };
}
export interface ILikePostSuccess {
  type: typeof actionTypesPost.LIKE_POST_SUCCESS;
  data: { postId: number; userId: number };
}
export interface ILikePostError {
  type: typeof actionTypesPost.LIKE_POST_ERROR;
  error: Error;
}
export interface IUnlikePostReqeust {
  type: typeof actionTypesPost.UNLIKE_POST_REQUEST;
  data: { postId: number };
}
export interface IUnlikePostSuccess {
  type: typeof actionTypesPost.UNLIKE_POST_SUCCESS;
  data: { postId: number; userId: number };
}
export interface IUnlikePostError {
  type: typeof actionTypesPost.UNLIKE_POST_ERROR;
  error: Error;
}
export interface IUploadImagesReqeust {
  type: typeof actionTypesPost.UPLOAD_IMAGES_REQUEST;
  data: FormData;
}
export interface IUploadImagesSuccess {
  type: typeof actionTypesPost.UPLOAD_IMAGES_SUCCESS;
  data: string[];
}
export interface IUploadImagesError {
  type: typeof actionTypesPost.UPLOAD_IMAGES_ERROR;
  error: Error;
}

export interface IRetweetReqeust {
  type: typeof actionTypesPost.RETWEET_REQUEST;
  data: { postId: number };
}
export interface IRetweetSuccess {
  type: typeof actionTypesPost.RETWEET_SUCCESS;
  data: IPost;
}
export interface IRetweetError {
  type: typeof actionTypesPost.RETWEET_ERROR;
  error: Error;
}

export interface IRemoveImage {
  type: typeof actionTypesPost.REMOVE_IMAGE;
  data: number;
}

export type ActionsPost =
  | IAddPostReqeust
  | IAddPostSuccess
  | IAddPostError
  | IRemovePostReqeust
  | IRemovePostSuccess
  | IRemovePostError
  | ILoadPostReqeust
  | ILoadPostSuccess
  | ILoadPostError
  | ILoadPostsReqeust
  | ILoadPostsSuccess
  | ILoadPostsError
  | ILoadUserPostsReqeust
  | ILoadUserPostsSuccess
  | ILoadUserPostsError
  | ILoadHashtagPostsReqeust
  | ILoadHashtagPostsSuccess
  | ILoadHashtagPostsError
  | IAddCommentReqeust
  | IAddCommentSuccess
  | IAddCommentError
  | ILikePostReqeust
  | ILikePostSuccess
  | ILikePostError
  | IUnlikePostReqeust
  | IUnlikePostSuccess
  | IUnlikePostError
  | IUploadImagesReqeust
  | IUploadImagesSuccess
  | IUploadImagesError
  | IRetweetReqeust
  | IRetweetSuccess
  | IRetweetError
  | IRemoveImage;
