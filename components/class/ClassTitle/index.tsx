import styled from 'styled-components';
import { SectionTitle } from '../../SectionTitle';

const Hour = styled.span`
  font-size: 0.7em;
  color: ${({ theme }) => theme.class.hourColor};
  background-color: ${({ theme }) => theme.class.hourBgColor};
  line-height: 1.25em;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 1px 0.2em;
  margin-right: 0.4em;
`;

export const ClassTitle = ({
  day,
  time,
  title,
}: {
  day: string;
  time: number;
  title: string;
}) => {
  return (
    <SectionTitle>
      {`${title} `}
      <Hour>{`${day}曜${time}限`}</Hour>
    </SectionTitle>
  );
};
