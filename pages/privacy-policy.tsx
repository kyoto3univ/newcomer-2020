import { Container } from '../components/Container';
import { SectionTitle } from '../components/SectionTitle';

export default () => {
  return (
    <Container>
      <SectionTitle>プライバシーポリシー</SectionTitle>
      <p>
        {`本文書は、当サイト（新入生応援サイト）における個人情報の保護およびその適切な取り扱いについての方針を示したものです。`}
      </p>
      <h5>当サイトが利用するアクセス解析ツールについて</h5>
      <p>
        {`当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。 `}
        {`このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。`}
        {`このトラフィックデータは匿名で収集されており、個人を特定するものではありません。`}
        {`また、法律で定められた場合を除き、利用者の許可なくデータを第三者に開示することはありません。`}
      </p>
      <p>
        {`これらの情報はCookieを無効にするなどにより収集を拒否することが出来ます。`}
        {`詳細につきましては`}
        <a href='https://support.google.com/analytics/answer/6004245'>{`データの保護(Google社)`}</a>
        {`などでご確認ください。また、データのGoogle社による利用については`}
        <a href='https://policies.google.com/technologies/partner-sites'>
          {`Googleパートナーのサイトやアプリを使用する際のGoogleによるデータ使用`}
        </a>
        {`よりご確認ください。`}
      </p>
    </Container>
  );
};
