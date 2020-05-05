import { GetStaticProps } from 'next';
import Head from 'next/head';
import { fetchEventList } from '../../../api/contentful/event';
import { ClubEventItem } from '../../../components/club/ClubEventItem';
import { Container } from '../../../components/Container';
import { Ogp } from '../../../components/Ogp';
import { SectionTitle } from '../../../components/SectionTitle';
import { ExtractPromise } from '../../../utils/return-type';

type Props = {
  events: ExtractPromise<ReturnType<typeof fetchEventList>>;
};

export default ({ events }: Props) => {
  return (
    <>
      <Head>
        <title>新歓イベント情報</title>
      </Head>
      <Ogp
        title='新歓イベント情報'
        description='新歓イベント情報を掲載しています'
        smallImage='https://kit-newcomer.3univkyoto.com/images/icons/icon-512x512.png'
      />
      <Container>
        <SectionTitle>新歓イベントリスト</SectionTitle>
        <p>
          {`今年度の新歓イベントは新型コロナウイルス感染症の対策のためLINE(OpenChat)やTwitter, `}
          <a href='https://zoom.us'>Zoom</a>
          {', '}
          <a href='https://discordapp.com'>Discord</a>
          {'で行われます。'}
          {'各イベントごとに各団体に申し込みが必要です。'}
          <br />
          {
            '開始時や申し込み時に、LINEやTwitterのDMなどでイベント参加に必要な情報が送られます。'
          }
          {'イベント会場がZoomの場合は事前の登録作業は不要です。'}
          {'DiscordでのイベントはDiscordアカウントを作成する必要があります。'}
          <br />
          {'新歓イベントは新入生や先輩と交流する貴重な機会です。'}
          {'ぜひ参加しましょう！'}
        </p>
        <div>
          {events.length > 0 ? (
            events.map((event) => <ClubEventItem {...event} key={event.id} />)
          ) : (
            <b>まだ登録されたイベントがありません</b>
          )}
        </div>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const events = await fetchEventList();

  return {
    props: {
      events,
    },
  };
};
