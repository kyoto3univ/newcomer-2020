const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  exportTrailingSlash: true,
  env: {
    GA_ID: process.env.GA_ID || '',
  },
  webpack(config) {
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        cacheId: 'workbox',
        swDest: 'sw.js',
        skipWaiting: true,
        clientsClaim: false,
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

    return config;
  },
};
