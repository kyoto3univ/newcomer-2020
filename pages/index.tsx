import Head from 'next/head';
import { Container } from '../components/Container';
import { ContentCard } from '../components/ContentCard';
import { ContentCardContainer } from '../components/ContentCard/container';
import { Ogp } from '../components/Ogp';
import { SectionTitle } from '../components/SectionTitle';

export default () => {
  return (
    <>
      <Head>
        <title>京都工繊新入生応援サイト</title>
      </Head>
      <Ogp
        title='京都工繊新入生応援サイト'
        description='このサイトでは、COVID-19の影響で新歓や初回授業を受けられなくなった新入生をサポートする情報を配信しています'
      />
      <Container>
        <SectionTitle>このサイトについて</SectionTitle>
        <p>
          {`このサイトでは、COVID-19の影響で新歓や初回授業を受けられなくなった京都工芸繊維大学の新入生をサポートする情報を配信しています。`}
        </p>
      </Container>
      <Container>
        <SectionTitle>コンテンツ</SectionTitle>
        <ContentCardContainer>
          <ContentCard
            title='部活・サークル紹介'
            description='京都工芸繊維大学のサークル・部活動や他大学のインカレサークルを紹介します'
            link='/club-circle'
          />
          <ContentCard
            title='授業の紹介'
            description='一般教養や選択科目、さらに三大学合同で行う授業について、教員や生徒からのコメントを交えて紹介します。'
            link='/class'
          />
        </ContentCardContainer>
      </Container>
    </>
  );
};
