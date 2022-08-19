const HtmlWebPackPlugin = require("html-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const isProd = process.env.NODE_ENV === "production";

const deps = require("./package.json").dependencies;

const plugins = [
  new ModuleFederationPlugin({
    name: "reactApp",
    filename: "remoteEntry.js",
    library: { type: "var", name: "reactApp" },
    remotes: {},
    exposes: {
      "./addReact": "./src/addReact",
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: deps["react-dom"],
      },
    },
  }),
];

if (!isProd) {
  plugins.push(
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    })
  );
}
plugins.push(new FileManagerPlugin({
  events: {
    onEnd: {
      copy: [{ source: "./dist", destination: "../../dist" }],
    },
  },
}))

module.exports = {
  output: {
    publicPath: "auto",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8084,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins,
};
