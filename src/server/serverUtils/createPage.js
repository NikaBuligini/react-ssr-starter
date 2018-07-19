/** @flow */

import fs from 'fs';
import path from 'path';

const isDevelopment = process.env.NODE_ENV !== 'production';

const pathToTemplate = isDevelopment
  ? path.resolve(__dirname, '../../../public/template.html')
  : path.resolve(__dirname, '../../../dist/client/template.html');

const template = fs.existsSync(pathToTemplate) ? fs.readFileSync(pathToTemplate, 'utf8') : '';

type ReplacerContext = {
  [key: string]: string,
};

const replacer = (context: ReplacerContext) => (s: string, name: string) => context[name] || '';

function formatString(input: string, context: ReplacerContext) {
  return input.replace(/%(\w+)%/g, replacer(context));
}

export default (
  html: string,
  preloadedState: ?Object,
  helmet: any,
  styleTags: string,
  loadableBundles: any,
) => {
  const context = {
    title: helmet.title.toString(),
    meta: helmet.meta.toString(),
    link: helmet.link.toString(),
    styleTags,
    html,
    preloadedState: `
      <script>
        // WARNING: See the following for security issues around embedding JSON in HTML:
        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
    `,
    loadableBundles,
  };

  return formatString(template, context);
};
