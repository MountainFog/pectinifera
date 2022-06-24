const path = require('path')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const port = process.env.port || process.env.npm_config_port || 81

const name = '飞天云课堂' // page title
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// 记录打包速度
const smp = new SpeedMeasurePlugin()

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  indexPath: 'index.html',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: `https://kedu-ivs-dev.devdolphin.com`
      },
      '/cloud-rbac': {
        target: `https://kedu-ivs-dev.devdolphin.com`
      },
      '/jy-system-management-he': {
        target: `https://kedu-ivs-dev.devdolphin.com`
      }
    }
  },
  configureWebpack: smp.wrap({
    // 在webpack的name字段中提供页面的标题
    // 可以在index.html中访问它以注入正确的标题
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'), // 主目录
        views: resolve('src/views'), // 页面
        components: resolve('src/components'), // 组件
        api: resolve('src/api'), // 接口
        utils: resolve('src/utils'), // 通用功能
        assets: resolve('src/assets'), // 静态资源
        style: resolve('src/style') // 通用样式
      }
    }
  }),
  chainWebpack (config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('cheap-source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!IS_PRODUCTION,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    loaderOptions: {
      sass: {
        data:
          '@import "style/_mixin.scss";@import "style/_variables.scss";@import "style/common.scss";' // 全局引入
      }
    }
  }
}
