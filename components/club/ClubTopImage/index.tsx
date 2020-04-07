import React from 'react';
import styled from 'styled-components';
import { ClubTopImageImg } from './image';
import { ClubTopImageYouTube } from './youtube';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;

  img,
  .yt {
    width: 85%;
  }
  img {
    cursor: pointer;
    object-fit: contain;
    max-height: 800px;
  }
  iframe {
    width: 100%;
  }
  .lazy-load-image-background {
    text-align: center;
  }

  @media screen and (max-width: 520px) {
    img,
    .yt {
      width: 100%;
    }
  }
`;
type Props = {
  image?: string | null;
  youtube?: string | null;
  imageMeta?: { width: number; height: number } | null;
  imageAlt?: string | null;
};

export const ClubTopImage = ({
  image,
  youtube,
  imageAlt,
  imageMeta,
}: Props) => {
  if (youtube) {
    return (
      <Container>
        <ClubTopImageYouTube youtube={youtube} />
      </Container>
    );
  }

  if (image) {
    return (
      <Container>
        <ClubTopImageImg
          image={image}
          imageAlt={imageAlt}
          imageMeta={imageMeta}
        />
      </Container>
    );
  }
  return null;
};
