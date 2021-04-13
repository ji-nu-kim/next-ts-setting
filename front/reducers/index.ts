import { combineReducers, Reducer, AnyAction } from 'redux';

import user from './user';
import post from './post';
import { RootStateInterface } from '../interfaces/RootState';
import { HYDRATE } from 'next-redux-wrapper';

const rootReducer: Reducer<RootStateInterface, AnyAction> = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducers = combineReducers({
        user,
        post,
      });
      return combinedReducers(state, action);
    }
  }
};

// const rootReducer: Reducer<
//   RootStateInterface,
//   AnyAction
// > = combineReducers<RootStateInterface>({
//   user,
//   post,
// });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
