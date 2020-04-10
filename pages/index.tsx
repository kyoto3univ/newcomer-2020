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
        <SectionTitle sakura>このサイトを作った理由</SectionTitle>
        <p>
          {`今年度の京都工芸繊維大学の新入生は、COVID-19の影響で新歓や初回授業を受けられなくなっています。`}
          {`そこで、新入生の助けとなる情報を発信するために作成しました。`}
        </p>
      </Container>
      <Container>
        <SectionTitle sakura>新入生向け情報をチェック!</SectionTitle>
        <ContentCardContainer>
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
