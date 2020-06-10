import { DateTime } from 'luxon';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { fetchEvent, fetchEventList } from '../../../api/contentful/event';
import { ClubImages } from '../../../components/club/ClubImages';
import { Container } from '../../../components/Container';
import { Markdown } from '../../../components/Markdown';
import { Ogp } from '../../../components/Ogp';
import { SectionTitle } from '../../../components/SectionTitle';
import { ExtractPromise } from '../../../utils/return-type';

const Time = styled.time`
  font-weight: bold;
  text-align: right;
  display: block;
`;

const Orgs = styled.span`
  font-size: 0.9em;
  color: ${({ theme }) => theme.event.orgsColor};
  background-color: ${({ theme }) => theme.event.orgsBgColor};
  line-height: 1.25em;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 1px 0.2em;
  margin-right: 0.4em;
`;

type Props = {
  eventInfo: ExtractPromise<ReturnType<typeof fetchEvent>>;
};

export default ({ eventInfo }: Props) => {
  const dateTimeString = React.useMemo(() => {
    return DateTime.fromISO(eventInfo.date).toFormat('yyyy/MM/dd(EEE) HH:mm～');
  }, [eventInfo.date]);

  return (
    <>
      <Head>
        <title>
          {eventInfo.title} ({eventInfo.orgs}) - 部活動イベント情報
        </title>
      </Head>
      <Ogp
        title={`${eventInfo.title} (${eventInfo.orgs}) - 部活動イベント情報`}
        description={eventInfo.content.slice(0, 80)}
      />
      <Container>
        <SectionTitle>
          {eventInfo.orgs && <Orgs>{eventInfo.orgs}</Orgs>}
          {eventInfo.title}
        </SectionTitle>
        <Time>{dateTimeString}</Time>
        <Markdown source={eventInfo.content} />
        <ClubImages images={eventInfo.images} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  if (!params) throw new Error('params is required');

  const eventInfo = await fetchEvent(params.id);

  return {
    props: {
      eventInfo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await fetchEventList();

  return {
    paths: events.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};
