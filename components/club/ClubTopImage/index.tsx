import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import ImageViewer from '../../ImageViewer';

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

export const ClubTopImage = ({
  image,
  youtube,
  imageAlt,
  imageMeta,
}: Props) => {
  const ytInitialHeight = React.useMemo(
    () =>
      process.browser && document.body.clientWidth < 520
        ? (document.body.clientWidth / 16) * 9
        : 360,
    [],
  );
  const imageInitialHeight = React.useMemo(
    () =>
      process.browser && imageMeta && document.body.clientWidth < 520
        ? (document.body.clientWidth / imageMeta.width) * imageMeta.height
        : 360,
    [],
  );
  const imageResizeWidth = React.useMemo(
    () => (process.browser && document.body.clientWidth < 520 ? 520 : 700),
    [],
  );
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const openImageViewer = React.useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = React.useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  const onImageLoaded = React.useCallback(() => {
    setIsImageLoaded(true);
  }, []);

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
        <LazyLoadImage
          src={`${image}?w=${imageResizeWidth}&fm=jpg&q=85`}
          alt={imageAlt || ''}
          height={isImageLoaded ? undefined : imageInitialHeight}
          onClick={openImageViewer}
          afterLoad={onImageLoaded}
        />
        {isViewerOpen && (
          <ImageViewer
            src={[image]}
            currentIndex={0}
            onClose={closeImageViewer}
          />
        )}
      </Container>
    );
  }
  return null;
};
