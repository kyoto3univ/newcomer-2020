const NextWorkboxPlugin = require('next-workbox-webpack-plugin');

module.exports = {
  exportTrailingSlash: true,
  env: {
    GA_ID: process.env.GA_ID || '',
  },
  webpack(config, { isServer, dev, buildId }) {
    if (!isServer && !dev) {
      config.plugins.push(
        new NextWorkboxPlugin({
          buildId,
          removeDir: false,
          swDestRoot: './static',
          swURLRoot: '/static',
        }),
      );
    }

    return config;
  },
};
