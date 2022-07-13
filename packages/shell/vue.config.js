const { defineConfig } = require('@vue/cli-service');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  devServer :{
    port : 8085
  },
  lintOnSave : false,
  publicPath : 'auto',
  transpileDependencies: true,
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].templateParameters = {
              production: isProd,
              BASE_URL : isProd ? "http://127.0.0.1:8080/" : "http://localhost:8085/"
            };
            return args;
        })
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "shell",
        filename: "shellRemoteEntry.js",
        library: { type: "var", name: "shell" },
        exposes: {},
        // remoteType : 'var',
        remotes: {
          item: "item",
          reactApp: "reactApp"
        },
        shared: {
          vue: {   
            requiredVersion:'^3.0.0'}
        }
      }),
      new FileManagerPlugin({
        events: {
          // onStart:{
          //   delete: ['../../dist/'],
          //   mkdir: ['../../dist/'],  
          // },
          onEnd: {
            copy: [
              { source: './dist', destination: '../../dist' },
            ],
          }
        }
      })
    ],
  },
});
