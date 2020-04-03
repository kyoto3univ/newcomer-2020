import Link from 'next/link';
import styled from 'styled-components';

type Props = {
  title: string;
  description: string;
  image?: string;
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
`;

const Image = styled.img`
  object-fit: cover;
  width: 84px;
  height: 84px;
  padding-right: 12px;
`;

const TextContainer = styled.div``;
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
        {image && <Image src={image} />}
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </TextContainer>
      </Container>
    </Link>
  );
};
