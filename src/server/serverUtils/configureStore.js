// @flow

import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../redux/reducers';

export default function configureStore(preloadedState?: Object = {}): Store<*, *, *> {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
}
