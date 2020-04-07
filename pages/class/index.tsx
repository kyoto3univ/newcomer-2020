import { GetStaticProps } from 'next';
import Head from 'next/head';
import { fetchClassList } from '../../api/contentful/class';
import { ClassList } from '../../components/class/ClassList';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

type Props = {
  classes: ExtractPromise<ReturnType<typeof fetchClassList>>;
};
export default ({ classes }: Props) => {
  return (
    <>
      <Head>
        <title>3大学共同授業の案内</title>
      </Head>
      <Container>
        <section>
          <SectionTitle>授業の選択について</SectionTitle>
          <p>xxx yyy zzz</p>
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
