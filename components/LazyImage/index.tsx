import React from 'react';
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from 'react-lazy-load-image-component';

type Props = LazyLoadImageProps & {
  initialWidth?: number;
  initialHeight?: number;
};

export const LazyImage = ({
  initialWidth,
  initialHeight,
  afterLoad,
  // tslint:disable-next-line: trailing-comma
  ...rest
}: Props) => {
  const [isLoaded, setLoaded] = React.useState(false);
  const onLoad = React.useCallback(() => {
    setLoaded(true);
    if (afterLoad) afterLoad();
  }, [afterLoad, setLoaded]);

  return (
    <LazyLoadImage
      {...rest}
      afterLoad={onLoad}
      width={isLoaded ? undefined : initialWidth}
      height={isLoaded ? undefined : initialHeight}
    />
  );
};
