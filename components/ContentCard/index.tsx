import Link from 'next/link';
import styled from 'styled-components';

const Card = styled.a`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-shadow: 5px;
  max-width: 300px;
  margin: 1.3rem;
  padding: 1.25rem;
  cursor: pointer;
  box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in;
  transform: scale(1);
  text-decoration: none;
  color: #212529;

  &:hover {
    transform: scale(1.05);
  }
`;

const Title = styled.h5`
  margin: 0;
  margin-bottom: 0.75rem;
  word-wrap: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 1.25em;
  color: #007bff;

  &::after {
    content: '\0bb';
    margin-left: 5px;
  }
`;

const Description = styled.p`
  margin: 0;
`;

type Props = {
  title: string;
  description: string;
  image?: string;
  link: string;
};
export const ContentCard = ({ title, description, link }: Props) => {
  return (
    <Link href={link} passHref>
      <Card>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Card>
    </Link>
  );
};
