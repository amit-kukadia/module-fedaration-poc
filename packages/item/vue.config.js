const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const isProd = process.env.NODE_ENV === "production";

module.exports = defineConfig({
  devServer :{
    port : 8080
  },
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
        name: "item",
        filename: "itemRemoteEntry.js",
        library: { type: "var", name: "item" },
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
    ]
  }
});
