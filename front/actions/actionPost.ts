import { IComment, ICommentProps, IPost } from '../interfaces/db';
import {
  actionTypesPost,
  IAddPostReqeust,
  IAddPostSuccess,
  IAddPostError,
  IRemovePostReqeust,
  IRemovePostSuccess,
  IRemovePostError,
  IUpdatePostReqeust,
  IUpdatePostSuccess,
  IUpdatePostError,
  IAddCommentReqeust,
  IAddCommentSuccess,
  IAddCommentError,
  ILoadPostReqeust,
  ILoadPostSuccess,
  ILoadPostError,
  ILoadPostsReqeust,
  ILoadPostsSuccess,
  ILoadPostsError,
  ILoadUserPostsReqeust,
  ILoadUserPostsSuccess,
  ILoadUserPostsError,
  ILoadHashtagPostsReqeust,
  ILoadHashtagPostsSuccess,
  ILoadHashtagPostsError,
  ILikePostReqeust,
  ILikePostSuccess,
  ILikePostError,
  IUnlikePostReqeust,
  IUnlikePostSuccess,
  IUnlikePostError,
  IUploadImagesReqeust,
  IUploadImagesSuccess,
  IUploadImagesError,
  IRetweetReqeust,
  IRetweetSuccess,
  IRetweetError,
  IRemoveImage,
} from '../interfaces/post/postAction.interfaces';

export const addPostRequestAction = (data: FormData): IAddPostReqeust => {
  return {
    type: actionTypesPost.ADD_POST_REQUEST,
    data,
  };
};
export const addPostSuccessAction = (data: IPost): IAddPostSuccess => {
  return {
    type: actionTypesPost.ADD_POST_SUCCESS,
    data,
  };
};
export const addPostErrorAction = (error: Error): IAddPostError => {
  return {
    type: actionTypesPost.ADD_POST_ERROR,
    error,
  };
};
export const removePostRequestAction = (data: {
  postId: number;
}): IRemovePostReqeust => {
  return {
    type: actionTypesPost.REMOVE_POST_REQUEST,
    data,
  };
};
export const removePostSuccessAction = (data: {
  postId: number;
}): IRemovePostSuccess => {
  return {
    type: actionTypesPost.REMOVE_POST_SUCCESS,
    data,
  };
};
export const removePostErrorAction = (error: Error): IRemovePostError => {
  return {
    type: actionTypesPost.REMOVE_POST_ERROR,
    error,
  };
};
export const updatePostRequestAction = (data: {
  postId: number;
  content: string;
}): IUpdatePostReqeust => {
  return {
    type: actionTypesPost.UPDATE_POST_REQUEST,
    data,
  };
};
export const updatePostSuccessAction = (data: {
  postId: number;
  content: string;
}): IUpdatePostSuccess => {
  return {
    type: actionTypesPost.UPDATE_POST_SUCCESS,
    data,
  };
};
export const updatePostErrorAction = (error: Error): IUpdatePostError => {
  return {
    type: actionTypesPost.UPDATE_POST_ERROR,
    error,
  };
};

export const loadPostRequestAction = (data: {
  postId: number;
}): ILoadPostReqeust => {
  return {
    type: actionTypesPost.LOAD_POST_REQUEST,
    data,
  };
};
export const loadPostSuccessAction = (data: IPost): ILoadPostSuccess => {
  return {
    type: actionTypesPost.LOAD_POST_SUCCESS,
    data,
  };
};
export const loadPostErrorAction = (error: Error): ILoadPostError => {
  return {
    type: actionTypesPost.LOAD_POST_ERROR,
    error,
  };
};
export const loadPostsRequestAction = (data: {
  postId: number;
}): ILoadPostsReqeust => {
  return {
    type: actionTypesPost.LOAD_POSTS_REQUEST,
    data,
  };
};
export const loadPostsSuccessAction = (data: IPost[]): ILoadPostsSuccess => {
  return {
    type: actionTypesPost.LOAD_POSTS_SUCCESS,
    data,
  };
};
export const loadPostsErrorAction = (error: Error): ILoadPostsError => {
  return {
    type: actionTypesPost.LOAD_POSTS_ERROR,
    error,
  };
};
export const loadUserPostsRequestAction = (data: {
  postId: number;
  userId: number;
}): ILoadUserPostsReqeust => {
  return {
    type: actionTypesPost.LOAD_USER_POSTS_REQUEST,
    data,
  };
};
export const loadUserPostsSuccessAction = (
  data: IPost[]
): ILoadUserPostsSuccess => {
  return {
    type: actionTypesPost.LOAD_USER_POSTS_SUCCESS,
    data,
  };
};
export const loadUserPostsErrorAction = (error: Error): ILoadUserPostsError => {
  return {
    type: actionTypesPost.LOAD_USER_POSTS_ERROR,
    error,
  };
};
export const loadHashtagPostsRequestAction = (data: {
  postId: number;
  hashtag: string;
}): ILoadHashtagPostsReqeust => {
  return {
    type: actionTypesPost.LOAD_HASHTAG_POSTS_REQUEST,
    data,
  };
};
export const loadHashtagPostsSuccessAction = (
  data: IPost[]
): ILoadHashtagPostsSuccess => {
  return {
    type: actionTypesPost.LOAD_HASHTAG_POSTS_SUCCESS,
    data,
  };
};
export const loadHashtagPostsErrorAction = (
  error: Error
): ILoadHashtagPostsError => {
  return {
    type: actionTypesPost.LOAD_HASHTAG_POSTS_ERROR,
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
export const addCommentSuccessAction = (data: IComment): IAddCommentSuccess => {
  return {
    type: actionTypesPost.ADD_COMMENT_SUCCESS,
    data,
  };
};
export const addCommentErrorAction = (error: Error): IAddCommentError => {
  return {
    type: actionTypesPost.ADD_COMMENT_ERROR,
    error,
  };
};

export const likePostRequestAction = (data: {
  postId: number;
}): ILikePostReqeust => {
  return {
    type: actionTypesPost.LIKE_POST_REQUEST,
    data,
  };
};
export const likePostSuccessAction = (data: {
  postId: number;
  userId: number;
}): ILikePostSuccess => {
  return {
    type: actionTypesPost.LIKE_POST_SUCCESS,
    data,
  };
};
export const likePostErrorAction = (error: Error): ILikePostError => {
  return {
    type: actionTypesPost.LIKE_POST_ERROR,
    error,
  };
};
export const unlikePostRequestAction = (data: {
  postId: number;
}): IUnlikePostReqeust => {
  return {
    type: actionTypesPost.UNLIKE_POST_REQUEST,
    data,
  };
};
export const unlikePostSuccessAction = (data: {
  postId: number;
  userId: number;
}): IUnlikePostSuccess => {
  return {
    type: actionTypesPost.UNLIKE_POST_SUCCESS,
    data,
  };
};
export const unlikePostErrorAction = (error: Error): IUnlikePostError => {
  return {
    type: actionTypesPost.UNLIKE_POST_ERROR,
    error,
  };
};

export const uploadImagesRequestAction = (
  data: FormData
): IUploadImagesReqeust => {
  return {
    type: actionTypesPost.UPLOAD_IMAGES_REQUEST,
    data,
  };
};
export const uploadImagesSuccessAction = (
  data: string[]
): IUploadImagesSuccess => {
  return {
    type: actionTypesPost.UPLOAD_IMAGES_SUCCESS,
    data,
  };
};
export const uploadImagesErrorAction = (error: Error): IUploadImagesError => {
  return {
    type: actionTypesPost.UPLOAD_IMAGES_ERROR,
    error,
  };
};

export const retweetRequestAction = (data: {
  postId: number;
}): IRetweetReqeust => {
  return {
    type: actionTypesPost.RETWEET_REQUEST,
    data,
  };
};
export const retweetSuccessAction = (data: IPost): IRetweetSuccess => {
  return {
    type: actionTypesPost.RETWEET_SUCCESS,
    data,
  };
};
export const retweetErrorAction = (error: Error): IRetweetError => {
  return {
    type: actionTypesPost.RETWEET_ERROR,
    error,
  };
};

export const removeImage = (data: number): IRemoveImage => {
  return {
    type: actionTypesPost.REMOVE_IMAGE,
    data,
  };
};
