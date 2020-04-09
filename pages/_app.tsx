import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { pageview } from '../api/gtag';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ServiceWorkerLoader } from '../components/ServiceWorkerLoader';
import { theme } from '../styles/theme';

Router.events.on('routeChangeComplete', (url) => pageview(url));

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.textColor};
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
      'Hiragino Sans', Meiryo, sans-serif;
  }

  a {
    color: ${({ theme }) => theme.linkColor};
    text-decoration: none;
  }
`;
export default ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ServiceWorkerLoader />
    </ThemeProvider>
  );
};
