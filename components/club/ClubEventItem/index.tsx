import { DateTime } from 'luxon';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Container = styled.a`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: ${({ theme }) => theme.club.cardTextColor};
  display: block;
  display: flex;
  flex-direction: row;
  padding: 0.3em 0.1em;
  align-items: center;
  justify-content: space-between;

  &:first-child {
    border-top: 0;
  }
  @media screen and (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h4`
  margin: 3px;
  font-weight: bold;
  font-size: 1.3em;
  color: ${({ theme }) => theme.club.cardTitleColor};
  line-height: 1.3em;
`;

const Time = styled.time`
  line-height: 1.3em;
  align-self: flex-end;
  white-space: nowrap;
`;

export const ClubEventItem = ({
  id,
  title,
  date,
}: {
  id: string;
  title: string;
  date: string;
}) => {
  const dateTimeString = React.useMemo(() => {
    const dt = DateTime.fromISO(date);
    const today = DateTime.local();

    const dayDiffHour = dt.diff(today).as('hour');
    if (dayDiffHour < 12) {
      return `${dayDiffHour}時間後`;
    } else {
      return dt.toFormat('MM/dd(EEE) HH:mm～');
    }
  }, [date]);

  return (
    <Link
      href='/club-circle/event/[id]'
      as={`/club-circle/event/${id}`}
      passHref
    >
      <Container>
        <Title>{title}</Title>
        <Time>{dateTimeString}</Time>
      </Container>
    </Link>
  );
};
