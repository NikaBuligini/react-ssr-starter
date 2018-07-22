import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  version: 1,
  key: 'root',
  storage,
  whitelist: [],
  debug: isDevelopment,
};

const preloadedState = window.__PRELOADED_STATE__;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistReducer(config, rootReducer),
  preloadedState,
  isDevelopment ? composeEnhancers(applyMiddleware(thunk)) : applyMiddleware(thunk),
);

export default store;

if (isDevelopment && module.hot) {
  module.hot.accept();
}
