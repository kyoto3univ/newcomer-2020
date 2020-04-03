import { LazyLoadImage } from 'react-lazy-load-image-component';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

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
};

export const ClubTopImage = ({ image, youtube }: Props) => {
  if (youtube) {
    return (
      <Container>
        <YouTube videoId={youtube} containerClassName='yt' />
      </Container>
    );
  }

  if (image) {
    return (
      <Container>
        <LazyLoadImage src={image} />
      </Container>
    );
  }
  return null;
};
