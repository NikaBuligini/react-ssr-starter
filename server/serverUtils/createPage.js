const env = require('../../config/env')();
const PUBLIC_URL = env.raw.PUBLIC_URL;
const isProduction = env.raw.NODE_ENV === 'production';

const assetManifest = isProduction
  ? require('../../dist/asset-manifest.json')
  : { 'app.js': '/app.bundle.js' };

const handleScriptInjection = (bundles, location) => {
  const jsFilePaths = Object.keys(assetManifest)
    .filter(file => file.match(/\.js$/))
    .map(jsFile => assetManifest[jsFile]);

  const bundleFilePaths = [...bundles]
    .filter(bundle => bundle.file.match(/\.js$/))
    .map(jsBundle => `${PUBLIC_URL}/${jsBundle.file}`); // or jsBundle.publicPath

  return [...jsFilePaths, ...bundleFilePaths]
    .map(
      jsFilePath =>
        location === 'head'
          ? `<link rel="preload" as="script" href="${jsFilePath}" />`
          : `<script type="text/javascript" src="${jsFilePath}"></script>`,
    )
    .join('');
};

const createPage = ({ helmet, preloadedState, styleTags, bundles, html }) => {
  const htmlAttrs = helmet.htmlAttributes.toString();
  const bodyAttrs = helmet.bodyAttributes.toString();

  return `
    <!doctype html>
    <html ${htmlAttrs}>

      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${handleScriptInjection(bundles, 'head')}
        ${helmet.link.toString()}
        ${styleTags}
      </head>

      <body ${bodyAttrs}>
        <div id='app'>${html}</div>

        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        
        ${handleScriptInjection(bundles, 'body')}
        <script>window.renderer();</script>
      </body>

    </html>
  `;
};

module.exports = createPage;
