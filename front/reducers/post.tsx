import { actionTypesPost, PostState, ActionsPost } from '@interfaces/index';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState: PostState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 'wlsdn5153',
        nickname: 'jinu',
      },
      content: '첫 번째 게시글 #해시태그',
      Images: [
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와',
        },
        {
          User: {
            nickname: 'hero',
          },
          content: '오우',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const dummyPost = {
  id: 2,
  content: '더미',
  User: {
    id: 'do',
    nickname: 'dummy',
  },
  Images: [],
  Comments: [],
};

interface HydratePayload {
  reducer: PostState;
}

const reducer = (
  state = initialState,
  action: ActionsPost | { type: typeof HYDRATE; payload: HydratePayload }
): PostState => {
  switch (action.type) {
    case actionTypesPost.ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case HYDRATE:
      return { ...state, ...action.payload.reducer };
    default:
      return state;
  }
};

export default reducer;
