import { ICommentProps, IPost } from '../db';

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
  LOAD_POSTS_REQUEST: 'LOAD_POSTS_REQUEST',
  LOAD_POSTS_SUCCESS: 'LOAD_POSTS_SUCCESS',
  LOAD_POSTS_ERROR: 'LOAD_POSTS_ERROR',
} as const;

export interface IAddPostReqeust {
  type: typeof actionTypesPost.ADD_POST_REQUEST;
  data: { content: string; userId: string };
}
export interface IAddPostSuccess {
  type: typeof actionTypesPost.ADD_POST_SUCCESS;
  data: { postId: string; content: string; userId: string };
}
export interface IAddPostError {
  type: typeof actionTypesPost.ADD_POST_ERROR;
  error: any;
}

export interface IRemovePostReqeust {
  type: typeof actionTypesPost.REMOVE_POST_REQUEST;
  data: string;
}
export interface IRemovePostSuccess {
  type: typeof actionTypesPost.REMOVE_POST_SUCCESS;
  data: string;
}
export interface IRemovePostError {
  type: typeof actionTypesPost.REMOVE_POST_ERROR;
  error: any;
}

export interface ILoadPostsReqeust {
  type: typeof actionTypesPost.LOAD_POSTS_REQUEST;
}
export interface ILoadPostsSuccess {
  type: typeof actionTypesPost.LOAD_POSTS_SUCCESS;
  data: IPost[];
}
export interface ILoadPostsError {
  type: typeof actionTypesPost.LOAD_POSTS_ERROR;
  error: any;
}

export interface IAddCommentReqeust {
  type: typeof actionTypesPost.ADD_COMMENT_REQUEST;
  data: ICommentProps;
}
export interface IAddCommentSuccess {
  type: typeof actionTypesPost.ADD_COMMENT_SUCCESS;
  data: ICommentProps;
}
export interface IAddCommentError {
  type: typeof actionTypesPost.ADD_COMMENT_ERROR;
  error: any;
}

export type ActionsPost =
  | IAddPostReqeust
  | IAddPostSuccess
  | IAddPostError
  | IRemovePostReqeust
  | IRemovePostSuccess
  | IRemovePostError
  | ILoadPostsReqeust
  | ILoadPostsSuccess
  | ILoadPostsError
  | IAddCommentReqeust
  | IAddCommentSuccess
  | IAddCommentError;
