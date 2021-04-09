import { ICommentProps, IPost } from '../interfaces/db';
import {
  actionTypesPost,
  IAddPostReqeust,
  IAddPostSuccess,
  IAddPostError,
  IRemovePostReqeust,
  IRemovePostSuccess,
  IRemovePostError,
  IAddCommentReqeust,
  IAddCommentSuccess,
  IAddCommentError,
  ILoadPostsReqeust,
  ILoadPostsSuccess,
  ILoadPostsError,
} from '../interfaces/post/postAction.interfaces';

export const addPostRequestAction = (data: {
  content: string;
  userId: string;
}): IAddPostReqeust => {
  return {
    type: actionTypesPost.ADD_POST_REQUEST,
    data,
  };
};
export const addPostSuccessAction = (data: {
  postId: string;
  content: string;
  userId: string;
}): IAddPostSuccess => {
  return {
    type: actionTypesPost.ADD_POST_SUCCESS,
    data,
  };
};
export const addPostErrorAction = (error: any): IAddPostError => {
  return {
    type: actionTypesPost.ADD_POST_ERROR,
    error,
  };
};
export const removePostRequestAction = (data: string): IRemovePostReqeust => {
  return {
    type: actionTypesPost.REMOVE_POST_REQUEST,
    data,
  };
};
export const removePostSuccessAction = (data: string): IRemovePostSuccess => {
  return {
    type: actionTypesPost.REMOVE_POST_SUCCESS,
    data,
  };
};
export const removePostErrorAction = (error: any): IRemovePostError => {
  return {
    type: actionTypesPost.REMOVE_POST_ERROR,
    error,
  };
};

export const loadPostsRequestAction = (): ILoadPostsReqeust => {
  return {
    type: actionTypesPost.LOAD_POSTS_REQUEST,
  };
};
export const loadPostsSuccessAction = (data: IPost[]): ILoadPostsSuccess => {
  return {
    type: actionTypesPost.LOAD_POSTS_SUCCESS,
    data,
  };
};
export const loadPostsErrorAction = (error: any): ILoadPostsError => {
  return {
    type: actionTypesPost.LOAD_POSTS_ERROR,
    error,
  };
};

export const addCommentRequestAction = (
  data: ICommentProps
): IAddCommentReqeust => {
  return {
    type: actionTypesPost.ADD_COMMENT_REQUEST,
    data,
  };
};
export const addCommentSuccessAction = (
  data: ICommentProps
): IAddCommentSuccess => {
  return {
    type: actionTypesPost.ADD_COMMENT_SUCCESS,
    data,
  };
};
export const addCommentErrorAction = (error: any): IAddCommentError => {
  return {
    type: actionTypesPost.ADD_COMMENT_ERROR,
    error,
  };
};
