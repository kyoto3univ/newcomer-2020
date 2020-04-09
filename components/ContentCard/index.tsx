import Link from 'next/link';
import styled from 'styled-components';

const Card = styled.a`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  box-shadow: 5px;
  padding: 1.25rem;
  cursor: pointer;
  box-shadow: 2.5px 2.5px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in;
  transform: scale(1);
  text-decoration: none;
  color: ${({ theme }) => theme.card.textColor};

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
  color: ${({ theme }) => theme.card.titleColor};

  &::after {
    content: '\0bb';
    margin-left: 5px;
  }
`;

const Description = styled.p`
  margin: 0;
`;

type Props = {
  title: string | React.ReactElement;
  description: string | React.ReactElement;
  image?: string;
  link: string;
  asLink?: string;
};
export const ContentCard = ({ title, description, link, asLink }: Props) => {
  return (
    <Link href={link} as={asLink} passHref>
      <Card>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Card>
    </Link>
  );
};
