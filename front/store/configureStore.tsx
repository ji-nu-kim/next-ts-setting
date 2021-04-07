import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '@reducers/index';

const configureStore: MakeStore = () => {
  // const middlewares = [];

  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware())
      : compose(composeWithDevTools());

  const store = createStore(rootReducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
