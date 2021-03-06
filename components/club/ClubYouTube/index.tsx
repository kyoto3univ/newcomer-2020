import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .yt {
    width: 85%;
  }
  iframe {
    width: 100%;
  }

  @media screen and (max-width: 520px) {
    .yt {
      width: 100%;
    }
  }
`;
export const ClubYouTube = ({ youtube }: { youtube: string }) => {
  const ytInitialHeight = React.useMemo(
    () =>
      process.browser && document.body.clientWidth < 520
        ? (document.body.clientWidth / 16) * 9
        : 360,
    [],
  );
  const ytOpts = React.useMemo(() => {
    if (
      youtube.match(
        /https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)&list=([a-zA-Z0-9\-_]+)/,
      )
    ) {
      return {
        videoId: RegExp.$1,
        playerVars: {
          list: RegExp.$2,
        },
      };
    } else if (
      youtube.match(/https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/)
    ) {
      return {
        videoId: RegExp.$1,
        playerVars: {},
      };
    } else if (youtube.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/)) {
      return {
        videoId: RegExp.$1,
        playerVars: {},
      };
    }

    return null;
  }, [youtube]);
  return ytOpts ? (
    <Container>
      <YouTube
        videoId={ytOpts.videoId}
        containerClassName='yt'
        opts={{
          height: `${ytInitialHeight}`,
          playerVars: {
            rel: 0,
            ...ytOpts.playerVars,
          },
        }}
      />
    </Container>
  ) : null;
};
