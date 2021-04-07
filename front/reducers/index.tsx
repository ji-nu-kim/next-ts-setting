import { combineReducers, Reducer, AnyAction } from 'redux';

import user from './user';
import post from './post';
import { RootStateInterface } from '@interfaces/RootState';

const rootReducer: Reducer<
  RootStateInterface,
  AnyAction
> = combineReducers<RootStateInterface>({
  user,
  post,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
