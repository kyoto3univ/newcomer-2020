import { GetStaticProps } from 'next';
import Head from 'next/head';
import { fetchClubList } from '../../api/contentful';
import { ClubCard } from '../../components/ClubCard';
import { Container } from '../../components/Container';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

type Props = {
  clubs: ExtractPromise<ReturnType<typeof fetchClubList>>;
};
export default ({ clubs }: Props) => {
  return (
    <>
      <Head>
        <title>クラブ・サークル紹介</title>
      </Head>
      <Container>
        <SectionTitle>クラブ・サークル紹介</SectionTitle>
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            title={club.name}
            description={club.shortDescription}
            link={`/club-circle/${club.id}`}
            image={club.image}
          />
        ))}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const clubs = await fetchClubList();

  return {
    props: {
      clubs,
    },
  };
};
