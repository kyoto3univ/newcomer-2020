import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { fetchClass, fetchClassList } from '../../api/contentful/class';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

type Props = {
  classInfo: ExtractPromise<ReturnType<typeof fetchClass>>;
};
export default ({ classInfo }: Props) => {
  return (
    <>
      <Head>
        <title>{`${classInfo.title} - 科目紹介`}</title>
      </Head>
      <Container>
        <SectionTitle>{classInfo.title}</SectionTitle>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  if (!params?.id) throw new Error('id is required');

  const classInfo = await fetchClass(params.id);

  return {
    props: {
      classInfo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const classes = await fetchClassList();

  return {
    paths: classes.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};
