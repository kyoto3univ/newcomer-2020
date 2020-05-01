export const normalizeUrl = (url: string) => {
  return url.replace(/^\/\//, 'https://');
};
