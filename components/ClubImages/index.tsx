import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled from 'styled-components';
import ImageViewer from '../ImageViewer';

const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  > img {
    margin: 15px;
    max-width: 90%;
    width: 360px;
    height: 200px;
    object-fit: contain;
    cursor: pointer;
  }
`;

const EmptyImage = styled.div`
  width: 390px;
  display: block;
`;

type Props = {
  images: Array<{
    url: string;
    title: string;
  }>;
};
export const ClubImages = ({ images }: Props) => {
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  const openImageViewer = React.useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = React.useCallback(() => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  }, []);

  const imageUrls = React.useMemo(() => images.map(({ url }) => url), [images]);

  return (
    <>
      {images.length > 0 && <small>タップで拡大</small>}
      <ImageList>
        {images.map((image, index) => (
          <LazyLoadImage
            key={image.url}
            src={`${image.url}?w=480`}
            alt={image.title}
            onClick={() => openImageViewer(index)}
          />
        ))}
        {images.length % 2 !== 0 && <EmptyImage />}
        {isViewerOpen && (
          <ImageViewer
            src={imageUrls}
            currentIndex={currentImage}
            onClose={closeImageViewer}
          />
        )}
      </ImageList>
    </>
  );
};
