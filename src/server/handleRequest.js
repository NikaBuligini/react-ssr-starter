// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import type { Store } from 'redux';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import log from 'npmlog';
import App from '../shared/App';
import configureStore from './serverUtils/configureStore';
import createPage from './serverUtils/createPage';
import write from './serverUtils/write';
import stats from './react-loadable.json';

type AppStore = Store<*, *, *>;

function handleRender(req: express$Request, res: express$Response, store: AppStore) {
  const loadableModules: any = [];

  const styleSheet = new ServerStyleSheet();

  const markup = renderToString(
    styleSheet.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={{}}>
          <Loadable.Capture report={moduleName => loadableModules.push(moduleName)}>
            <App />
          </Loadable.Capture>
        </StaticRouter>
      </Provider>,
    ),
  );

  const preloadedState = store.getState();

  const helmet = Helmet.renderStatic();

  const styleTags = styleSheet.getStyleTags();

  const loadableBundles = getBundles(stats, loadableModules);

  const html = createPage(markup, preloadedState, helmet, styleTags, loadableBundles);

  write(html, 'text/html', res);
}

type Resolve = (req: express$Request, store: AppStore, render: (store: AppStore) => void) => void;

export function handler(resolve: Resolve) {
  return (req: express$Request, res: express$Response) =>
    resolve(req, configureStore(), (store: AppStore) => handleRender(req, res, store));
}

export default function handleRequest(req: express$Request, res: express$Response) {
  handleRender(req, res, configureStore());
}
