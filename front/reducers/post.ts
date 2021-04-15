import { actionTypesPost, PostState, ActionsPost } from '../interfaces/index';
import { HYDRATE } from 'next-redux-wrapper';

import produce from 'immer';

export const initialState: PostState = {
  mainPosts: [],
  imagePaths: [],
  postAdded: false,
  singlePost: null,
  hasMorePost: true,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  retweetLoading: false,
  retweetDone: false,
  retweetError: null,

  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
};
interface HydratePayload {
  reducer: PostState;
}

const reducer = (
  state = initialState,
  action: ActionsPost | { type: typeof HYDRATE; payload: HydratePayload }
): PostState => {
  return produce(state, draft => {
    switch (action.type) {
      // case HYDRATE:
      //   return { ...state, ...action.payload.reducer };
      case actionTypesPost.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case actionTypesPost.ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
        draft.mainPosts.unshift(action.data);
        break;
      case actionTypesPost.ADD_POST_ERROR:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case actionTypesPost.REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case actionTypesPost.REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter(
          v => v.id !== action.data.postId
        );
        break;
      case actionTypesPost.REMOVE_POST_ERROR:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case actionTypesPost.UPDATE_POST_REQUEST:
        draft.updatePostLoading = true;
        draft.updatePostDone = false;
        draft.updatePostError = null;
        break;
      case actionTypesPost.UPDATE_POST_SUCCESS: {
        draft.updatePostLoading = false;
        draft.updatePostDone = true;
        const post = draft.mainPosts.find(v => v.id === action.data.postId);
        if (post) {
          post.content = action.data.content;
        }
        break;
      }
      case actionTypesPost.UPDATE_POST_ERROR:
        draft.updatePostLoading = false;
        draft.updatePostError = action.error;
        break;

      case actionTypesPost.LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case actionTypesPost.LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.data;
        break;
      case actionTypesPost.LOAD_POST_ERROR:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case actionTypesPost.LOAD_HASHTAG_POSTS_REQUEST:
      case actionTypesPost.LOAD_USER_POSTS_REQUEST:
      case actionTypesPost.LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case actionTypesPost.LOAD_HASHTAG_POSTS_SUCCESS:
      case actionTypesPost.LOAD_USER_POSTS_SUCCESS:
      case actionTypesPost.LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePost = action.data.length === 10;
        break;
      case actionTypesPost.LOAD_HASHTAG_POSTS_ERROR:
      case actionTypesPost.LOAD_USER_POSTS_ERROR:
      case actionTypesPost.LOAD_POSTS_ERROR:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case actionTypesPost.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case actionTypesPost.ADD_COMMENT_SUCCESS: {
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        const post = draft.mainPosts.find(v => v.id === action.data.PostId);
        if (post) {
          post.Comments.unshift(action.data);
        }
        break;
      }
      case actionTypesPost.ADD_COMMENT_ERROR:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;

      case actionTypesPost.LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case actionTypesPost.LIKE_POST_SUCCESS: {
        console.log(action.data);
        const post = draft.mainPosts.find(v => v.id === action.data.postId);
        post?.Likers.push({ id: action.data.userId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case actionTypesPost.LIKE_POST_ERROR:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case actionTypesPost.UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      case actionTypesPost.UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find(v => v.id === action.data.postId);
        if (post) {
          post.Likers = post.Likers.filter(v => v.id !== action.data.userId);
        }
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case actionTypesPost.UNLIKE_POST_ERROR:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;

      case actionTypesPost.UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case actionTypesPost.UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      }
      case actionTypesPost.UPLOAD_IMAGES_ERROR:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      case actionTypesPost.RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;
      case actionTypesPost.RETWEET_SUCCESS: {
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case actionTypesPost.RETWEET_ERROR:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;

      case actionTypesPost.REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;

      default:
        break;
    }
  });
};

export default reducer;
