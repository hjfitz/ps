const Notifier = require('webpack-build-notifier');
const path = require('path');

const ping = new Notifier({ title: `${process.env.SITE_NAME || 'Built'}` });


const output = path.join(__dirname, 'public');


module.exports = {
  entry: {
    bundle: ['./src/client/app/router.jsx'],
    login: ['./src/client/login/login.jsx'],
  },
  output: {
    filename: '[name].js',
    path: output,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['@babel/preset-env', {
              useBuiltIns: 'usage',
              targets: {
                browsers: [
                  'last 2 versions',
                  'ie >= 11',
                ],
              },
            }],
            '@babel/react',
          ],
        },
      },
    ],
  },
  plugins: [ping],
};
