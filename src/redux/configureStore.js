import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

export default (preloadedState, extraMiddlewares = []) => {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (isDevelopment) {
    return createStore(
      rootReducer,
      preloadedState,
      composeEnhancer(applyMiddleware(thunk, ...extraMiddlewares)),
    );
  }

  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, ...extraMiddlewares));
};
