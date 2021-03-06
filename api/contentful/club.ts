import { Asset, Entry, EntryCollection } from 'contentful';
import { client } from './client';
import { EventInfo } from './event';

type Category = {
  name: string;
  priority: number;
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
  events?: Array<Entry<EventInfo>>;
};

let clubListCache: EntryCollection<ClubInfo> | null = null;
export const fetchClubList = async () => {
  const result =
    clubListCache ??
    (clubListCache = await client.getEntries<ClubInfo>({
      content_type: 'circleInfo',
      limit: 500,
      order: 'sys.createdAt',
    }));

  return result.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    categories: item.fields.category?.map(({ fields }) => fields.name) ?? [],
    image: item.fields.image?.fields.file.url ?? null,
    imageMeta: item.fields.image?.fields.file.details.image ?? null,
    shortDescription: item.fields?.shortDescription ?? '',
  }));
};

export const fetchCategories = async () => {
  const result = await client.getEntries<Category>({
    content_type: 'Category',
    limit: 500,
    order: 'sys.createdAt',
  });

  return result.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
  }));
};

export const fetchClub = async (id: string) => {
  const entries =
    clubListCache ??
    (clubListCache = await client.getEntries<ClubInfo>({
      content_type: 'circleInfo',
      limit: 500,
      order: 'sys.createdAt',
    }));

  const targetIndex = entries.items.findIndex(({ sys }) => sys.id === id);
  if (targetIndex === -1) {
    throw new Error('specified id is not found');
  }

  const result = entries.items[targetIndex];

  return {
    id: result.sys.id,
    name: result.fields.name,
    categories: result.fields.category?.map(({ fields }) => fields.name) ?? [],
    image: result.fields.image?.fields.file.url ?? null,
    imageMeta: result.fields.image?.fields.file.details.image ?? null,
    shortDescription: result.fields?.shortDescription ?? '',
    description: result.fields.description ?? '',
    largeImage: result.fields.largeImage?.fields.file.url ?? null,
    largeImageMeta: result.fields.largeImage?.fields.file.details.image ?? null,
    largeImageAlt: result.fields.largeImage?.fields.title ?? '',
    youtubeId: result.fields.movieUrl ? result.fields.movieUrl : null,
    locationAndTime: result.fields.locationAndTime,
    contactUrl: result.fields.contactUrl ?? null,
    howToJoin: result.fields.howToJoin,
    urls: result.fields.urls ?? [],
    files:
      result.fields.files?.map((file) => ({
        title: file.fields.title,
        url: file.fields.file.url,
      })) ?? [],
    images:
      result.fields.images?.map((file) => ({
        title: file.fields.title,
        url: file.fields.file.url,
        width: file.fields.file.details.image?.width ?? 0,
        height: file.fields.file.details.image?.height ?? 0,
      })) ?? [],
    events:
      result.fields.events?.map((event) => ({
        id: event.sys.id,
        title: event.fields.title,
        date: event.fields.date,
        content: event.fields.content,
        images: event.fields.images?.map((image) => image.fields.file.url),
      })) ?? [],
    nextClub:
      targetIndex < entries.items.length - 1
        ? {
            id: entries.items[targetIndex + 1].sys.id,
            name: entries.items[targetIndex + 1].fields.name,
          }
        : null,
    previousClub:
      targetIndex > 0
        ? {
            id: entries.items[targetIndex - 1].sys.id,
            name: entries.items[targetIndex - 1].fields.name,
          }
        : null,
  };
};
