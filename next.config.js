let path = require('path');
let webpack = require('webpack');

let isProduction;
if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'production';
  isProduction = true;
} else {
  isProduction = process.env.NODE_ENV === 'production';
}

let envs = {};
if (process.env.NODE_ENV === 'production') {
  envs = {
    NODE_ENV: 'production',
    BASE_URL: '',
    DEBUG: JSON.stringify(process.env.DEBUG ?? false),
  };
} else if (process.env.NODE_ENV === 'stage') {
  envs = {
    NODE_ENV: 'stage',
    BASE_URL: '',
    DEBUG: JSON.stringify(process.env.DEBUG ?? true),
  };
} else {
  envs = {
    fbClientId: '3044235379228131',
    googleClientId: '655496569198-f4akmc86kndanpb2p10uk80h5al1sg4l.apps.googleusercontent.com',
    instagramClientId: '282462186958896',
    NODE_ENV: 'local',
    BASE_URL: 'http://localhost:4096',
    DEBUG: JSON.stringify(process.env.DEBUG ?? true),
  };
}

module.exports = {
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/images/[name].[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(swf|otf|eot|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              name: '_next/static/assets/[name].[contenthash].[ext]',
            },
          },
        ],
      }
    );
    config.plugins.push(new webpack.EnvironmentPlugin(envs));

    return config;
  },

  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '~styles': path.join(__dirname, 'src/styles'),
      '~src': path.join(__dirname, 'src'),
      '~npm': path.join(__dirname, 'node_modules'),
    },
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  webpack5: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
