import React from 'react';
import styled from 'styled-components';
import { ContentCard } from '../../ContentCard';
import { ContentCardContainer } from '../../ContentCard/container';

const Hour = styled.span`
  font-size: 0.8em;
  color: #fff;
  background-color: #777;
  line-height: 1.25em;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 1px 0.2em;
  margin-right: 0.4em;
`;
type Props = {
  classes: Array<{
    id: string;
    title: string;
    summary: string;
    time: number;
    day: string;
  }>;
};
export const ClassList = ({ classes }: Props) => {
  return (
    <ContentCardContainer>
      {classes.map((item) => (
        <ContentCard
          title={
            <>
              <Hour>{`${item.day}${item.time}限`}</Hour>
              {item.title}
            </>
          }
          description={item.summary}
          link='/class/[id]'
          asLink={`/class/${item.id}`}
        />
      ))}
    </ContentCardContainer>
  );
};
