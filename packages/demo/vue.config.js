const { defineConfig } = require('@vue/cli-service')
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  devServer :{
    port : 8083
  },
  transpileDependencies: true,
  lintOnSave : false,
  publicPath :"auto" ,
  transpileDependencies: true,
  chainWebpack: config => {
    if (config.plugins.has('html') && isProd) {
      config.plugins.delete('html')
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "demo",
        filename: "demoRemoteEntry.js",
        library: { type: "var", name: "demo" },
        // remoteType: 'var',
        exposes: {
          "./HelloWorld": "./src/components/HelloWorld",
        },
        shared: {
          vue: {         
            requiredVersion:'^3.0.0'
          }
        }
      }),
      new FileManagerPlugin({
        events: {
          onEnd: {
            copy: [
              { source: './dist', destination: '../../dist' },
            ],
          }
        }
      })
    ]
  }
})
