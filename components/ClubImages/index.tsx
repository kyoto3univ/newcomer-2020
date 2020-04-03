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
    width: 360px;
    height: 200px;
    object-fit: cover;
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
    <ImageList>
      {images.map((image, index) => (
        <LazyLoadImage
          key={image.url}
          src={`${image.url}?w=360&fit=thumb`}
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
  );
};
