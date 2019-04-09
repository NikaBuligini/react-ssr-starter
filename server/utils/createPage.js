const assetManifest =
  process.env.NODE_ENV === 'production'
    ? require('../../build/asset-manifest.json')
    : { 'app.js': '/app.bundle.js' }

const handleScriptInjection = (bundles, location) => {
  const jsFilePaths = Object.keys(assetManifest)
    .filter(file => file.match(/\.js$/))
    .map(jsFile => assetManifest[jsFile])

  const bundleFilePaths = [...bundles]
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${jsBundle.publicPath}`)

  return [...jsFilePaths, ...bundleFilePaths]
    .map(jsFilePath =>
      location === 'head'
        ? `<link rel="preload" as="script" href="${jsFilePath}" />`
        : `<script type="text/javascript" src="${jsFilePath}"></script>`
    )
    .join('')
}

const createPage = ({ helmet, preloadedState, styleTags, bundles, html }) => {
  const htmlAttrs = helmet.htmlAttributes.toString()
  const bodyAttrs = helmet.bodyAttributes.toString()

  return `
    <!doctype html>
    <html ${htmlAttrs}>

      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${handleScriptInjection(bundles, 'head')}
        ${styleTags}
      </head>

      <body ${bodyAttrs}>

        <main id="root">${html}</main>

        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        
        ${handleScriptInjection(bundles, 'body')}
        <script>window.renderer()</script>

      </body>

    </html>
  `
}

export default createPage
