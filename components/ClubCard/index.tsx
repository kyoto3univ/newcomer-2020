import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';

type Props = {
  title: string;
  description: string;
  image?: string | null;
  link: string;
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
    width: 84px;
    height: 84px;
    object-fit: cover;
    display: inline-block;
  }
`;

const TextContainer = styled.div`
  margin-left: 12px;
`;

const Title = styled.h4`
  margin: 3px;
  font-weight: bold;
  font-size: 1.3em;
  color: #007bff;
`;

const Description = styled.p`
  line-height: 1.2em;
  margin: 3px;
`;

export const ClubCard = ({ title, description, link, image }: Props) => {
  return (
    <Link href={link} passHref>
      <Container>
        {image && (
          <LazyLoadImage width={84} height={84} src={image} alt={title} />
        )}
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      </Container>
    </Link>
  );
};
