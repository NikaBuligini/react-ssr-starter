import { createStore, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  version: 1,
  key: 'root',
  storage,
  whitelist: [],
  debug: false,
};

export default function configureStore(rootReducer, preloadedState, middlewares) {
  return createStore(persistReducer(config, rootReducer), preloadedState, compose(middlewares));
}
