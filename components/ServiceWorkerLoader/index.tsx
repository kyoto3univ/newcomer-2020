import React from 'react';

export const ServiceWorkerLoader = () => {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js')
        .then(() => {
          console.log('service worker registration successful');
        })
        .catch((err) => {
          console.warn('service worker registration failed', err.message);
        });
    }
  }, []);

  return null;
};
