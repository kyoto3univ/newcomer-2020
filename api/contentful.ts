import { Asset, createClient, Entry } from 'contentful';

const client = createClient({
  space: process.env.SPACE_ID as string,
  accessToken: process.env.ACCESS_TOKEN as string,
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
});

type Category = {
  name: string;
};

type ClubInfo = {
  name: string;
  category?: Array<Entry<Category>>;
  image?: Asset;
  largeImage?: Asset;
  shortDescription?: string;
  description: string;
  movieUrl?: string;
  locationAndTime: string;
  contactUrl?: string;
  howToJoin: string;
  urls?: string[];
  univ: string[];
  files: Asset[];
  images: Asset[];
};

export const fetchClubList = async () => {
  const result = await client.getEntries<ClubInfo>({
    content_type: 'circleInfo',
    select: [
      'sys.id',
      'fields.name',
      'fields.category',
      'fields.image',
      'fields.shortDescription',
    ].join(','),
    limit: 500,
  });

  return result.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    categories: item.fields.category?.map(({ fields }) => fields.name) || [],
    image: item.fields.image?.fields.file.url || null,
    imageMeta: item.fields.image?.fields.file.details.image || null,
    shortDescription: item.fields?.shortDescription || '',
  }));
};

export const fetchClub = async (id: string) => {
  const result = await client.getEntry<ClubInfo>(id);

  return {
    id: result.sys.id,
    name: result.fields.name,
    categories: result.fields.category?.map(({ fields }) => fields.name) || [],
    image: result.fields.image?.fields.file.url || null,
    imageMeta: result.fields.image?.fields.file.details.image || null,
    shortDescription: result.fields?.shortDescription || '',
    description: result.fields.description || '',
    largeImage: result.fields.largeImage?.fields.file.url || null,
    largeImageMeta: result.fields.largeImage?.fields.file.details.image || null,
    largeImageAlt: result.fields.largeImage?.fields.title || '',
    youtubeId: result.fields.movieUrl
      ? result.fields.movieUrl.replace(/.+\?v=/, '').replace(/youtu\.be\//, '')
      : null,
    locationAndTime: result.fields.locationAndTime,
    contactUrl: result.fields.contactUrl || null,
    howToJoin: result.fields.howToJoin,
    urls: result.fields.urls || [],
    files:
      result.fields.files?.map((file) => ({
        title: file.fields.title,
        url: file.fields.file.url,
      })) || [],
    images:
      result.fields.images?.map((file) => ({
        title: file.fields.title,
        url: file.fields.file.url,
        width: file.fields.file.details.image?.width || 0,
        height: file.fields.file.details.image?.height || 0,
      })) || [],
  };
};
