import { AppProps } from 'next/app';
import { Header } from '../components/Header';

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>
        {`
          html,
          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <Header />
      <Component {...pageProps} />
    </>
  );
};
