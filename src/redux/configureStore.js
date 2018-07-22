import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

export default (preloadedState, extraMiddlewares = []) => {
  if (isDevelopment) {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk, ...extraMiddlewares));
  }

  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, ...extraMiddlewares));
};
