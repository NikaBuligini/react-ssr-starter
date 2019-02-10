module.exports = function(api) {
  const isEnvDevelopment = process.env.NODE_ENV === 'development'
  api.cache.using(() => !isEnvDevelopment)

  return {
    presets: [
      ['@babel/preset-env', { useBuiltIns: 'usage', debug: isEnvDevelopment, loose: true }],
      ['@babel/preset-react', { development: isEnvDevelopment }],
      '@babel/preset-flow'
    ],
    plugins: []
  }
}
