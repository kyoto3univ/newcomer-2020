import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchClub, fetchClubList } from '../../api/contentful';
import { CategoryList } from '../../components/CategoryList';
import { ClubTopImage } from '../../components/ClubTopImage';
import { Container } from '../../components/Container';
import { Dl } from '../../components/DescriptionList';
import { PreWrapP } from '../../components/PreWrapP';
import { SectionTitle } from '../../components/SectionTitle';
import { ExtractPromise } from '../../utils/return-type';

const ClubLink = styled.a`
  display: block;
  margin-bottom: 5px;
`;
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
        <ClubTopImage
          image={club.largeImage}
          imageMeta={club.largeImageMeta}
          youtube={club.youtubeId}
        />
        <CategoryList data={club.categories} />
        <PreWrapP>{club.description}</PreWrapP>
        <Dl>
          {club.location && (
            <>
              <dt>活動場所</dt>
              <dd>{club.location}</dd>
            </>
          )}
          {club.time && (
            <>
              <dt>活動時間</dt>
              <dd>{club.time}</dd>
            </>
          )}
          {club.urls.length > 0 && (
            <>
              <dt>URL</dt>
              <dd>
                {club.urls.map((link) => (
                  <ClubLink href={link} target='_blank'>
                    {link}
                  </ClubLink>
                ))}
              </dd>
            </>
          )}
        </Dl>
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
