import { UserState, ActionsUser, actionTypesUser } from '../interfaces/index';
import { HYDRATE } from 'next-redux-wrapper';
import produce from 'immer';

export const initialState: UserState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  removeFollowerLoading: false,
  removeFollowerDone: false,
  removeFollowerError: null,
  loadFollowingsLoading: false,
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoading: false,
  loadFollowersDone: false,
  loadFollowersError: null,
  loadMyInfoLoading: false,
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  me: null,
  userInfo: null,
};

interface HydratePayload {
  reducer: UserState;
}

const reducer = (
  state = initialState,
  action: ActionsUser | { type: typeof HYDRATE; payload: HydratePayload }
): UserState => {
  return produce(state, draft => {
    switch (action.type) {
      // case HYDRATE:
      //   return { ...state, ...action.payload.reducer };
      case actionTypesUser.LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case actionTypesUser.LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case actionTypesUser.LOG_IN_ERROR:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case actionTypesUser.LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case actionTypesUser.LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.me = null;
        break;
      case actionTypesUser.LOG_OUT_ERROR:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

      case actionTypesUser.LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case actionTypesUser.LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case actionTypesUser.LOAD_MY_INFO_ERROR:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;

      case actionTypesUser.SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case actionTypesUser.SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case actionTypesUser.SIGN_UP_ERROR:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

      case actionTypesUser.FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case actionTypesUser.FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        if (draft.me) {
          draft.me.Followings.push({ id: action.data.userId });
        }
        break;
      case actionTypesUser.FOLLOW_ERROR:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case actionTypesUser.UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case actionTypesUser.UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        if (draft.me) {
          draft.me.Followings = draft.me.Followings.filter(
            v => v.id !== action.data.userId
          );
        }
        break;
      case actionTypesUser.UNFOLLOW_ERROR:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;

      case actionTypesUser.LOAD_FOLLOWERS_REQUEST:
        draft.loadFollowersLoading = true;
        draft.loadFollowersDone = false;
        draft.loadFollowersError = null;
        break;
      case actionTypesUser.LOAD_FOLLOWERS_SUCCESS:
        draft.loadFollowersLoading = false;
        draft.loadFollowersDone = true;
        if (draft.me) {
          draft.me.Followers = action.data;
        }
        break;
      case actionTypesUser.LOAD_FOLLOWERS_ERROR:
        draft.loadFollowersLoading = false;
        draft.loadFollowersError = action.error;
        break;
      case actionTypesUser.LOAD_FOLLOWINGS_REQUEST:
        draft.loadFollowingsLoading = true;
        draft.loadFollowingsDone = false;
        draft.loadFollowingsError = null;
        break;
      case actionTypesUser.LOAD_FOLLOWINGS_SUCCESS:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsDone = true;
        if (draft.me) {
          draft.me.Followings = action.data;
        }
        break;
      case actionTypesUser.LOAD_FOLLOWINGS_ERROR:
        draft.loadFollowingsLoading = false;
        draft.loadFollowingsError = action.error;
        break;
      case actionTypesUser.REMOVE_FOLLOWER_REQUEST:
        draft.removeFollowerLoading = true;
        draft.removeFollowerDone = false;
        draft.removeFollowerError = null;
        break;
      case actionTypesUser.REMOVE_FOLLOWER_SUCCESS:
        draft.removeFollowerLoading = false;
        draft.removeFollowerDone = true;
        if (draft.me) {
          draft.me.Followers = draft.me.Followers.filter(
            v => v.id !== action.data.userId
          );
        }
        break;
      case actionTypesUser.REMOVE_FOLLOWER_ERROR:
        draft.removeFollowerLoading = false;
        draft.removeFollowerError = action.error;
        break;

      case actionTypesUser.CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case actionTypesUser.CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        if (draft.me) {
          draft.me.nickname = action.data.nickname;
        }
        break;
      case actionTypesUser.CHANGE_NICKNAME_ERROR:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;

      case actionTypesUser.ADD_POST_TO_ME:
        if (draft.me) {
          draft.me.Posts.unshift({ id: action.data });
        }
        break;
      case actionTypesUser.REMOVE_POST_OF_ME:
        if (draft.me) {
          draft.me.Posts = draft.me.Posts.filter(
            v => v.id !== action.data.postId
          );
        }
        break;

      default:
        break;
    }
  });
};

export default reducer;
