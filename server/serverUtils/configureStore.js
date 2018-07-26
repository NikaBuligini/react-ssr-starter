import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../src/redux/reducers';

export default (preloadedState, extraMiddlewares = []) =>
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, ...extraMiddlewares));
