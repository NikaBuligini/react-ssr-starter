import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'
import Loadable from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'

import configureStore from './utils/configureStore'
import createPage from './utils/createPage'

const handleRequest = (req, res) => {
  const styleSheets = new ServerStyleSheet()
  const store = configureStore()
  const context = {}
  const modules = []

  const html = ReactDOMServer.renderToString(
    styleSheets.collectStyles(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <div>hello world</div>
          </Loadable.Capture>
        </StaticRouter>
      </Provider>
    )
  )

  const stats = require('../build/react-loadables.json')
  const bundles = getBundles(stats, modules)

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.redirect(context.url)
  } else {
    const markup = createPage({
      helmet: Helmet.renderStatic(),
      preloadedState: store.getState(),
      styleTags: styleSheets.getStyleTags(),
      bundles,
      html
    })

    res.status(200).send(markup)
  }
}

export default handleRequest
