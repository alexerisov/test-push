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
    fbClientId: '161418379213740',
    googleClientId: '245264013276-avgqsj1umm7sc07sk2dtdgkpmqmn0p42.apps.googleusercontent.com',
    NODE_ENV: 'production',
    BASE_URL: 'https://api.eatchefs.com',
    DEBUG: JSON.stringify(process.env.DEBUG ?? false)
  };
} else if (process.env.NODE_ENV === 'stage') {
  envs = {
    fbClientId: '161418379213740',
    googleClientId: '245264013276-avgqsj1umm7sc07sk2dtdgkpmqmn0p42.apps.googleusercontent.com',
    NODE_ENV: 'development',
    BASE_URL: 'https://api.eatchefs.goodbit.dev',
    DEBUG: true
  };
} else {
  envs = {
    fbClientId: '161418379213740',
    googleClientId: '245264013276-avgqsj1umm7sc07sk2dtdgkpmqmn0p42.apps.googleusercontent.com',
    NODE_ENV: 'development',
    BASE_URL: 'http://localhost:4096',
    DEBUG: true
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
              name: 'static/images/[name].[contenthash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(swf|otf|eot|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              name: '_next/static/assets/[name].[contenthash].[ext]'
            }
          }
        ]
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
      '~npm': path.join(__dirname, 'node_modules')
    },
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  webpack5: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};
