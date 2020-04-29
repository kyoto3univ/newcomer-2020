import React from 'react';
import styled from 'styled-components';
import { ClubYouTube } from '../ClubYouTube';
import { ClubTopImageImg } from './image';

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

  if (youtube) {
    return (
      <Container>
        <ClubYouTube youtube={youtube} />
      </Container>
    );
  }
  return null;
};
