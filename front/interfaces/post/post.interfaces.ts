import { IPost } from '../db';

export interface PostState {
  singlePost: IPost | null;
  mainPosts: IPost[];
  imagePaths: string[];
  hasMorePost: boolean;
  postAdded: boolean;

  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any;
  removePostLoading: boolean;
  removePostDone: boolean;
  removePostError: any;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: any;

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
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: any;
}
