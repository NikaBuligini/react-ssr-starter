/** @flow */

import React from 'react';
import Loadable from 'react-loadable';

const AsyncLine = Loadable({
  loader: () => import('../client/Line'),
  loading: () => <div />,
});

const App = () => (
  <div>
    Hello world from App!<AsyncLine />
  </div>
);

export default App;
