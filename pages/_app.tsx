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
            color: #212529;
          }

          a {
            color: #007bff;
            text-decoration: none;
          }
        `}
      </style>
      <Header />
      <Component {...pageProps} />
    </>
  );
};
