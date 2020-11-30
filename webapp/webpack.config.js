const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'live'
console.log(isDev)

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/static/webapp'),
    filename: 'main.js', // relative to the outputPath (defaults to / or root of the site)
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    hot: isDev,
    inline: isDev,
    contentBase: path.join(__dirname, '/src'), // serve your static files from here
    watchContentBase: true, // initiate a page refresh if static content changes
    proxy: [ // allows redirect of requests to webpack-dev-server to another destination
      {
        context: ['/api'],  // can have multiple
        target: (isDev ? 'http://localhost:8000' : ''), // server and port to redirect to
        secure: false,
      },
    ],
    port: 3000, // port webpack-dev-server listens to, defaults to 8080
    overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
      warnings: false, // defaults to false
      errors: false, // defaults to false
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
}
