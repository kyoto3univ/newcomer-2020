import Head from 'next/head';
import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';

export default () => {
  return (
    <>
      <Head>
        <title>京都三大学新入生応援サイト</title>
      </Head>
      <Container>
        <section>
          <SectionTitle>このサイトについて</SectionTitle>
          <p>
            このサイトでは、COVID-19の影響で新歓や初回授業を受けられなくなった新入生をサポートする情報を配信しています。
          </p>
        </section>
      </Container>
    </>
  );
};
