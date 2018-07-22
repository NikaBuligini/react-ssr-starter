import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import configureStore from './redux/configureStore';
import App from './App';

const store = configureStore(window.__PRELOADED_STATE__);

window.renderer = () =>
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('app'),
    );
  });
