import { ICommentProps } from '../interfaces/db';
import { actionTypesPost, PostState, ActionsPost } from '../interfaces/index';
import { HYDRATE } from 'next-redux-wrapper';
import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

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
  loadPostOneLoading: false,
  loadPostOneDone: false,
  loadPostOneError: null,
};

export const generateDummyPost = (number: number) =>
  Array(number)
    .fill(null)
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          content: faker.lorem.sentence(),
          postId: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
        },
      ],
    }));

const dummyPost = (data: {
  postId: string;
  content: string;
  userId: string;
}) => ({
  id: data.postId,
  content: data.content,
  User: {
    id: data.userId,
    nickname: 'dummy',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data: ICommentProps) => ({
  id: shortId.generate(),
  content: data.comment,
  postId: data.postId,
  User: {
    id: data.userId,
    nickname: 'dummy',
  },
});

interface HydratePayload {
  reducer: PostState;
}

const reducer = (
  state = initialState,
  action: ActionsPost | { type: typeof HYDRATE; payload: HydratePayload }
): PostState => {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload.reducer };
      case actionTypesPost.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case actionTypesPost.ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
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
        draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data);
        break;
      case actionTypesPost.REMOVE_POST_ERROR:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;

      case actionTypesPost.LOAD_POSTS_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case actionTypesPost.LOAD_POSTS_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case actionTypesPost.LOAD_POSTS_ERROR:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      case actionTypesPost.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case actionTypesPost.ADD_COMMENT_SUCCESS: {
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        const post = draft.mainPosts.find(v => v.id === action.data.postId);
        post?.Comments.unshift(dummyComment(action.data));
        break;
      }
      case actionTypesPost.ADD_COMMENT_ERROR:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
