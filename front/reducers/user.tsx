import { UserState, ActionsUser, actionTypesUser } from '../interfaces/index';
import { HYDRATE } from 'next-redux-wrapper';

export const initialState: UserState = {
  isLoggedIn: false,
  me: null,
  signUpData: {},
  loginData: {},
};

interface HydratePayload {
  reducer: UserState;
}

const reducer = (
  state = initialState,
  action: ActionsUser | { type: typeof HYDRATE; payload: HydratePayload }
): UserState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.reducer };
    case actionTypesUser.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    case actionTypesUser.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
