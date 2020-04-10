import { GetStaticProps } from 'next';
import Head from 'next/head';
import { fetchClassList } from '../../api/contentful/class';
import { ClassList } from '../../components/class/ClassList';
import { Container } from '../../components/Container';
import { Ogp } from '../../components/Ogp';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

type Props = {
  classes: ExtractPromise<ReturnType<typeof fetchClassList>>;
};
export default ({ classes }: Props) => {
  return (
    <>
      <Head>
        <title>授業の案内</title>
        <Ogp
          title={`授業の案内`}
          description={'授業の内容や感想を紹介します'}
        />
      </Head>
      <Container>
        <section>
          <SectionTitle>授業の選択について</SectionTitle>
          <p>
            ・共同化科目は、全ての科目に「大学ごとの」定員があり、抽選で履修者を決定します。
          </p>
          <p>
            ・抽選では、第5希望まで申し込むことができますが、人気の科目は履修者が集中するので、すべての科目で落選する場合があります。
            その場合は、その時間の科目を履修しないか、受講登録修正期間に空き定員のある授業に登録することになります。
          </p>
          <p>
            ・卒業認定に必要な単位数は、科目分類ごとに指定されているので、履修計画を立てて、授業を選択してください。(履修要項2020を確認してください)
          </p>
          <p>
            {`・共同化科目の科目分類は"人と自然", "人と社会", "人と文化","体の科学", "京の伝統文化と先端科学技術", "環境・倫理"の6種類です。`}
          </p>
        </section>
        <section>
          <SectionTitle>授業一覧</SectionTitle>
          <ClassList classes={classes} />
        </section>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const classes = await fetchClassList();

  return {
    props: {
      classes,
    },
  };
};
