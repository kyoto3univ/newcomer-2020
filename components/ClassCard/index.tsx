import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  title: string;
  description: string;
  hour: number;
  link: string;
};

const Container = styled.a`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: #212529;
  display: block;
`;

const Title = styled.h4`
  margin: 3px;
`;

const Hour = styled.span``;

const Description = styled.p`
  line-height: 1.2em;
  margin: 3px;
  word-break: break-all;
`;

export const ClassCard = ({ title, description, link, hour }: Props) => {
  return (
    <Link href={link} passHref>
      <Container>
        <Title>
          <Hour>{hour}時限</Hour>
          {title}
        </Title>
        <Description>{description}</Description>
      </Container>
    </Link>
  );
};
