import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 15px 0;

  img,
  .yt {
    width: 85%;
  }
  iframe {
    width: 100%;
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

export const ClubTopImage = ({ image, youtube, imageAlt }: Props) => {
  const ytInitialHeight = React.useMemo(
    () =>
      process.browser && document.body.clientWidth < 520
        ? (document.body.clientWidth / 16) * 9
        : 360,
    [],
  );
  if (youtube) {
    return (
      <Container>
        <YouTube
          videoId={youtube}
          containerClassName='yt'
          opts={{
            height: `${ytInitialHeight}`,
            playerVars: {
              rel: 0,
            },
          }}
        />
      </Container>
    );
  }

  if (image) {
    return (
      <Container>
        <LazyLoadImage src={image} alt={imageAlt || ''} />
      </Container>
    );
  }
  return null;
};
