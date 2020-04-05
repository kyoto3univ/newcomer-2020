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
          runtimeCaching: [
            {
              urlPattern: /\.json$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'data',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24,
                },
              },
            },
            {
              urlPattern: /\.(jpg|png)/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'assets',
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 14,
                },
              },
            },
          ],
        }),
      );
    }

    return config;
  },
};
