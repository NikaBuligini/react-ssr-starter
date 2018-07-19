import React from 'react';
import { render } from 'react-dom';
import App from '../shared/App';

const S = () => (
  <div>
    <App />
    <div>Hello again</div>
  </div>
);

render(<S />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
