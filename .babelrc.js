module.exports = function(api) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  api.cache(() => !isDevelopment)

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', loose: true, modules: 'cjs' }],
      ['@babel/preset-react', { development: isDevelopment }],
      '@babel/preset-flow'
    ],
    plugins: [
      'inline-react-svg',
      [
        'styled-components',
        {
          ssr: true,
          displayName: isDevelopment,
          minify: !isDevelopment,
          pure: !isDevelopment
        }
      ],
      isDevelopment && 'react-hot-loader/babel'
    ].filter(Boolean)
  }
}
