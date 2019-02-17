/* eslint-disable no-console */

if (process.env.NODE_ENV === 'development') {
  require('@babel/register')({
    plugins: [
      [
        'file-loader',
        {
          name: 'media/[name].[hash:8].[ext]',
          extensions: ['bmp', 'gif', 'jpg', 'jpeg', 'png'],
          publicPath: '/', // always serve from '/' in development
          outputPath: null,
          limit: 10000 /* 10KB */
        }
      ]
    ]
  })
}

const Loadable = require('react-loadable')
const app = require('./app').default

const PORT = process.env.PORT || 5000

Loadable.preloadAll().then(() => {
  app.listen(PORT, error => {
    if (error) {
      return console.error('SERVER: ', error)
    }

    console.log('SERVER: ', `Server running on port ${PORT}`)
  })
})
