import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import { CategoryList } from '../CategoryList';

type Props = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  categories: string[];
};

const Container = styled.a`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  text-decoration: none;
  color: #212529;
  display: block;
  padding: 1em 0;
  display: flex;
  flex-direction: row;

  img {
    min-width: 84px;
    min-height: 84px;
    width: 84px;
    height: 84px;
    object-fit: cover;
  }
`;

const TextContainer = styled.div`
  margin-left: 12px;
  @media screen and (max-width: 520px) {
    margin-left: 8px;
  }
`;

const Title = styled.h4`
  margin: 3px;
  font-weight: bold;
  font-size: 1.3em;
  color: #007bff;
  @media screen and (max-width: 520px) {
    font-size: 1.25em;
    line-height: 1.2em;
  }
`;

const Description = styled.p`
  line-height: 1.2em;
  margin: 3px;
  @media screen and (max-width: 520px) {
    line-height: 1.15em;
  }
`;

export const ClubCard = ({
  title,
  description,
  id,
  image,
  categories,
}: Props) => {
  return (
    <Link
      href={{ pathname: '/club-circle/[id]' }}
      as={{ pathname: `/club-circle/${id}` }}
      passHref
    >
      <Container>
        {image && (
          <LazyLoadImage
            width={84}
            height={84}
            src={`${image}?w=128&h=128&fit=fill`}
            alt={title}
          />
        )}
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <CategoryList data={categories} />
        </TextContainer>
      </Container>
    </Link>
  );
};
