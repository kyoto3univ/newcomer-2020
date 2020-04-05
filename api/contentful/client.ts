import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.SPACE_ID as string,
  accessToken: process.env.ACCESS_TOKEN as string,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
  environment: process.env.CONTENTFUL_ENV || 'master',
});
