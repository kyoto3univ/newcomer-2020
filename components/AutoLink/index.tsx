export const AutoLink = ({ url }: { url: string }) => {
  if (!url.match(/^https?:\/\//) && url.indexOf('@') > 0) {
    return (
      <a href={`mailto:${url}`} target='_blank'>
        {url}
      </a>
    );
  } else {
    return (
      <a href={url} target='_blank'>
        {url}
      </a>
    );
  }
};
