import webpackConfigFactory from '../internal/webpack/configFactory'

const webpackConfig = webpackConfigFactory({
  target: 'client',
  mode: 'development',
})

module.exports = (storybookConfig, configType) => {
  return {
    ...storybookConfig,
    module: {
      ...storybookConfig.module,
      plugins: [...storybookConfig.module.plugins, ...webpackConfig.plugins],
      resolve: { ...storybookConfig.module.resolve, ...webpackConfig.resolve },
    },
  }
}
