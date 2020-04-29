export const TextAutoLink = ({ content }: { content: string }) => {
  const items = content.split(/(https?:\/\/[a-z0-9.,_\/~#&=;%+@?\-\\(\\)]*)/gi);
  return (
    <>
      {items.map((item) => {
        if (item.match(/(https?:\/\/[a-z0-9.,_\/~#&=;%@+?\-\\(\\)]*)/gi)) {
          return <a href={RegExp.$1}>{item}</a>;
        }

        return item;
      })}
    </>
  );
};
