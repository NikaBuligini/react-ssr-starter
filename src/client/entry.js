import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';

const AsyncApp = Loadable({
  loader: () => import('../shared/App'),
  loading: () => <div />,
});

const AsyncLine = Loadable({
  loader: () => import('./Line'),
  loading: () => <div />,
});

const Wrapper = () => (
  <div>
    <AsyncLine />
    <AsyncApp />
  </div>
);

Loadable.preloadReady().then(() => {
  hydrate(<Wrapper />, document.getElementById('root'));
});

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment && module.hot) {
  module.hot.accept();
}
