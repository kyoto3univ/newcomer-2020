import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { fetchClub, fetchClubList } from '../../api/contentful';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

type Props = {
  club: ExtractPromise<ReturnType<typeof fetchClub>>;
};
export default ({ club }: Props) => {
  return (
    <>
      <Head>
        <title>{club.name} - 部活動・サークル紹介</title>
      </Head>
      <Container>
        <SectionTitle>{club.name}</SectionTitle>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  if (!params) throw new Error('params is required');

  const club = await fetchClub(params.id);

  return {
    props: {
      club,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const clubs = await fetchClubList();

  return {
    paths: clubs.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};
