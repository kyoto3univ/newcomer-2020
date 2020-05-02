import { Asset } from 'contentful';
import { client } from './client';

export type EventInfo = {
  title: string;
  date: string;
  content: string;
  images?: Asset[];
  orgs?: string;
};

export const fetchEvent = async (id: string) => {
  const event = await client.getEntry<EventInfo>(id);

  return {
    title: event.fields.title,
    date: event.fields.date,
    content: event.fields.content,
    images:
      event.fields.images?.map((image) => ({
        url: image.fields.file.url,
        title: image.fields.title ?? '',
      })) ?? [],
    orgs: event.fields.orgs ?? '',
  };
};

export const fetchEventList = async () => {
  const events = await client.getEntries<EventInfo>({
    content_type: 'EventInfo',
    select: ['sys.id', 'fields.title', 'fields.orgs', 'fields.date'].join(','),
    limit: 500,
    order: '-fields.date',
  });

  return events.items.map((event) => ({
    id: event.sys.id,
    title: event.fields.title,
    date: event.fields.date,
    orgs: event.fields.orgs ?? '',
  }));
};
