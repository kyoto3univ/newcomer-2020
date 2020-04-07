import React from 'react';
import YouTube from 'react-youtube';

export const ClubTopImageYouTube = ({ youtube }: { youtube: string }) => {
  const ytInitialHeight = React.useMemo(
    () =>
      process.browser && document.body.clientWidth < 520
        ? (document.body.clientWidth / 16) * 9
        : 360,
    [],
  );
  return (
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
  );
};
