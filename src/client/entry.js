import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import AppWrapper from './AppWrapper';
import store from '../redux/store';

Loadable.preloadReady().then(() => {
  hydrate(<AppWrapper store={store} />, document.getElementById('root'));
});

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment && module.hot) {
  module.hot.accept();
}
