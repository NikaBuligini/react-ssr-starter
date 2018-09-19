# [react-ssr-starter](https://github.com/ggogobera/react-ssr-starter)
This repo will give you a minimal basis of front-end development with React which you can also perceive by it's name. You can tweak it as you want in your project, but be sure you have got a ground for safe developing. It does, but mainly doesn't take safety measures, because of differences between various environements. It's all up to you how you integrate this code with your environement. All responsibilities are on you. As this starter uses styled-components, there isn't need to add css loaders... :exclamation: **STILL DEVELOPING** :exclamation:
## Table of contents
- [Usage](#usage)
  - [Start development server](#start-development-server)
  - [Bundle for production use](#bundle-for-production-use)
  - [Start production server](#start-production-server)
- [Folder Structure](#folder-structure)

## Usage
#### Just clone it on your local machine
```
git clone https://github.com/ggogobera/react-ssr-starter.git
```
#### Build Flow typed **!required**
```
npm run flow:build
```
#### Start development server
```
npm run start:dev
```
#### Bundle for production use
```
npm run bundle
```
#### Start production server
```
npm run start:prod
```
## Folder structure
```
config/
  ├── env.js
  ├── webpack.config.dev.js
  ├── webpack.config.prod.js
scripts/
  ├── utils/
  ├──   ├── logger.js
  ├── build.js
  ├── startDev.js
server/
  ├── serverUtils/
  │     ├── createPage.js
  │     ├── configureStore.js
  ├── app.js
  ├── handleRequest.js
  ├── index.js
src/
  ├── redux/
  │     ├── actions/
  │     │     ├── counter.js
  │     │     ├── index.js
  │     ├── reducers/
  │     │     ├── counter.js
  │     │     ├── index.js
  │     ├── configureStore.js
  ├── App.jsx
  ├── index.jsx
.babelrc
.eslintignore
.eslintrc
.flowconfig
.prettierrc
LICENSE
package.json
README.md
yarn.lock
```
