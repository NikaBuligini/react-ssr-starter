import { createStore, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const config = {
  version: 1,
  key: 'root',
  storage,
  whitelist: [],
  debug: true,
};

export default function configureStore(rootReducer, preloadedState, middlewares) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    persistReducer(config, rootReducer),
    preloadedState,
    composeEnhancers(middlewares),
  );

  if (module.hot) {
    module.hot.accept();
  }

  return store;
}
