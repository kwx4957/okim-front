const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  /** 웹 팩 설정*/
  // terser 플러그인 설정(prod mode 인 경우 console.log 제외)
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: 6,
              compress: { drop_console: true },
              output: { comments: false },
            },
          }),
        ],
      };
    } else {
      // mutate for development...
    }
  },
})