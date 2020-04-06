import React from 'react';
import ImageViewer from '../../ImageViewer';
import { LazyImage } from '../../LazyImage';

type Props = {
  image: string;
  imageMeta?: { width: number; height: number } | null;
  imageAlt?: string | null;
};

export const ClubTopImageImg = ({ imageMeta, image, imageAlt }: Props) => {
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

  const openImageViewer = React.useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = React.useCallback(() => {
    setIsViewerOpen(false);
  }, []);

  return (
    <>
      <LazyImage
        src={`${image}?w=${imageResizeWidth}&fm=jpg&q=85`}
        alt={imageAlt || ''}
        initialHeight={imageInitialHeight}
        onClick={openImageViewer}
        effect={'opacity'}
      />
      {isViewerOpen && (
        <ImageViewer
          src={[image]}
          currentIndex={0}
          onClose={closeImageViewer}
        />
      )}
    </>
  );
};
