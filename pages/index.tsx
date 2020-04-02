import Head from 'next/head';
import { Container } from '../components/Container';
import { ContentCard } from '../components/ContentCard';
import { ContentCardContainer } from '../components/ContentCard/container';
import { SectionTitle } from '../components/SectionTitle';

export default () => {
  return (
    <>
      <Head>
        <title>京都三大学新入生応援サイト</title>
      </Head>
      <Container>
        <SectionTitle>このサイトについて</SectionTitle>
        <p>
          このサイトでは、COVID-19の影響で新歓や初回授業を受けられなくなった新入生をサポートする情報を配信しています。
        </p>
      </Container>
      <Container>
        <SectionTitle>コンテンツ</SectionTitle>
        <ContentCardContainer>
          <ContentCard
            title='三大学共同授業（稲盛）の案内'
            description='ああああああああああああああああああああああああああああああああああああああああああああ'
            link='/inamori'
          />
          <ContentCard
            title='三大学共同授業（稲盛）の案内'
            description='ああああああああああああああああああああああああああああああああああああああああああああ'
            link='/inamori'
          />
          <ContentCard
            title='三大学共同授業（稲盛）の案内'
            description='ああああああああああああああああああああああああああああああああああああああああああああ'
            link='/inamori'
          />
        </ContentCardContainer>
      </Container>
      ;
    </>
  );
};
