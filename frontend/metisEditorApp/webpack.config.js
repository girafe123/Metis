var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-syntax-decorators', {legacy: true}], 
              '@babel/plugin-proposal-class-properties',
            ],
          }
        }
      },
      {
        test: /\.(s?)css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.(png|jpg|ttf|woff|woff2|eot|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 650000
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000,
    host: '0.0.0.0',
  },
  devtool: 'source-map',
};