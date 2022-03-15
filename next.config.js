let path = require('path');
let webpack = require('webpack');
const { i18n } = require('./next-i18next.config');

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
    BASE_URL: process.env.BASE_URL,
    DEBUG: JSON.stringify(process.env.DEBUG ?? false)
  };
} else if (process.env.NODE_ENV === 'stage') {
  envs = {
    fbClientId: '161418379213740',
    googleClientId: '245264013276-sbkrl06fu1e7d6m0d3724or58hvdmpej.apps.googleusercontent.com',
    BASE_URL: process.env.BASE_URL,
    DEBUG: true
  };
} else {
  envs = {
    fbClientId: '3044235379228131',
    googleClientId: '655496569198-f4akmc86kndanpb2p10uk80h5al1sg4l.apps.googleusercontent.com',
    BASE_URL: 'http://localhost:4096',
    DEBUG: true
  };
}

module.exports = {
  // env: envs,
  images: {
    disableStaticImages: true,
    domains: ['localhost', 'goodbit.dev', 'eatchefs.com']
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif)$/i,
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
        test: /\.(svg)$/i,
        use: {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
            ext: 'tsx'
          }
        }
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
      '~npm': path.join(__dirname, 'node_modules'),
      '~public': path.join(__dirname, 'public')
    },
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  i18n,
  trailingSlash: false,
  webpack5: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};
