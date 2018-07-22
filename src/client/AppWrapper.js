/** @flow */

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from '../shared/App';
import { increaseCounter } from '../redux/actions';

function createPersistor({ store }) {
  return persistStore(store, null, () => {
    const { dispatch } = store;
    dispatch(increaseCounter(1));
  });
}

type Props = {
  store: Object,
};

type State = {
  persistor: any,
};

class AppWrapper extends React.Component<Props, State> {
  state = {
    persistor: createPersistor(this.props),
  };

  render() {
    const { store } = this.props;
    const { persistor } = this.state;

    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    );
  }
}

export default AppWrapper;
