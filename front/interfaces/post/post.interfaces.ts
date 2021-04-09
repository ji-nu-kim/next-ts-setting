import { IPost } from '../db';

export interface PostState {
  singlePost: any;
  mainPosts: IPost[];
  imagePaths: { src: string }[];
  hasMorePost: boolean;
  postAdded: boolean;

  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;

  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: any;

  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: any;

  retweetLoading: boolean;
  retweetDone: boolean;
  retweetError: any;

  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: any;
  unlikePostLoading: boolean;
  unlikePostDone: boolean;
  unlikePostError: any;

  loadPostLoading: boolean;
  loadPostDone: boolean;
  loadPostError: any;
  loadPostOneLoading: boolean;
  loadPostOneDone: boolean;
  loadPostOneError: any;
}
