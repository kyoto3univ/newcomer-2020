import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { pageview } from '../api/gtag';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ServiceWorkerLoader } from '../components/ServiceWorkerLoader';

import 'react-lazy-load-image-component/src/effects/opacity.css';

Router.events.on('routeChangeComplete', (url) => pageview(url));

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>
        {`
          html,
          body {
            margin: 0;
            padding: 0;
            color: #212529;
            font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
              'Hiragino Sans', Meiryo, sans-serif;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }
        `}
      </style>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ServiceWorkerLoader />
    </>
  );
};
