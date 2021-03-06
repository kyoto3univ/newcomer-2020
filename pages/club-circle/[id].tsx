import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { fetchClub, fetchClubList } from '../../api/contentful';
import { AutoLink } from '../../components/AutoLink';
import { CategoryList } from '../../components/CategoryList';
import { ClubEventItem } from '../../components/club/ClubEventItem';
import { ClubImages } from '../../components/club/ClubImages';
import { ClubTopImage } from '../../components/club/ClubTopImage';
import { ClubYouTube } from '../../components/club/ClubYouTube';
import { Container } from '../../components/Container';
import { Dl } from '../../components/DescriptionList';
import { Ogp } from '../../components/Ogp';
import { Pager } from '../../components/Pager';
import { PreWrapP } from '../../components/PreWrapP';
import { SectionTitle } from '../../components/SectionTitle';
import { TextAutoLink } from '../../components/TextAutoLink';
import { ExtractPromise } from '../../utils/return-type';

const ClubLink = styled.a`
  display: block;
  margin-bottom: 5px;
  word-break: break-all;
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
      <Ogp
        title={`${club.name} - 部活動・サークル紹介`}
        description={club.shortDescription}
        largeImage={
          club.largeImage ? `${club.largeImage}?h=480&fit=fill` : null
        }
        smallImage={club.image ? `${club.image}?h=120&w=120&fit=fill` : null}
      />
      <Container>
        <Pager
          prev={
            club.previousClub
              ? {
                  href: '/club-circle/[id]',
                  as: `/club-circle/${club.previousClub.id}`,
                  title: club.previousClub.name,
                }
              : undefined
          }
          next={
            club.nextClub
              ? {
                  href: '/club-circle/[id]',
                  as: `/club-circle/${club.nextClub.id}`,
                  title: club.nextClub.name,
                }
              : undefined
          }
        />
        <SectionTitle>{club.name}</SectionTitle>
        <ClubTopImage
          image={club.largeImage}
          imageMeta={club.largeImageMeta}
          imageAlt={club.largeImageAlt}
          youtube={club.youtubeId}
        />
        <CategoryList data={club.categories} />
        <Dl>
          <dt>活動場所・時間</dt>
          <dd>{club.locationAndTime}</dd>
          {club.contactUrl && (
            <>
              <dt>連絡先</dt>
              <dd>
                <AutoLink url={club.contactUrl} />
              </dd>
            </>
          )}
          <dt>入部方法</dt>
          <dd>
            <TextAutoLink content={club.howToJoin} />
          </dd>
        </Dl>
        <PreWrapP>
          <TextAutoLink content={club.description} />
        </PreWrapP>
        {club.events.length > 0 && (
          <>
            <b>新歓イベント情報</b>
            <div>
              {club.events.map((event) => (
                <ClubEventItem {...event} orgs={null} key={event.id} />
              ))}
            </div>
          </>
        )}
        <Dl>
          {club.files.length > 0 && (
            <>
              <dt>ファイル</dt>
              <dd>
                {club.files.map((file) => (
                  <ClubLink href={file.url} target='_blank' key={file.url}>
                    {file.title}
                  </ClubLink>
                ))}
              </dd>
            </>
          )}
          {club.urls.length > 0 && (
            <>
              <dt>URL</dt>
              <dd>
                {club.urls.map((link) => (
                  <ClubLink href={link} target='_blank' key={link}>
                    {link}
                  </ClubLink>
                ))}
              </dd>
            </>
          )}
        </Dl>
        {club.youtubeId && club.largeImage && (
          <ClubYouTube youtube={club.youtubeId} />
        )}
        <ClubImages images={club.images} />
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
