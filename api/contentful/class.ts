import { Entry, EntryCollection } from 'contentful';
import { client } from './client';

type ClassReaction = {
  content: string;
};

type ClassInfo = {
  title: string;
  day: string;
  time: number;
  type: string | null;
  summary: string;
  teachers: string[];
  comment: string | null;
  textbook: string | null;
  evaluation: string | null;
  notes: string | null;
  officialUrl: string | null;
  reactions: Array<Entry<ClassReaction>>;
  tags: string[];
};

let classListCache: EntryCollection<ClassInfo> | null = null;
export const fetchClassList = async () => {
  const result =
    classListCache ??
    (classListCache = await client.getEntries<ClassInfo>({
      content_type: 'ClassInfo',
      limit: 500,
      order: 'fields.time',
    }));

  return result.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    time: item.fields.time,
    day: item.fields.day,
    type: item.fields.type ?? null,
    summary: item.fields.summary ?? '',
    tags: item.fields.tags ?? [],
  }));
};

export const fetchClass = async (id: string) => {
  const entries =
    classListCache ??
    (classListCache = await client.getEntries<ClassInfo>({
      content_type: 'ClassInfo',
      limit: 500,
      order: 'fields.time',
    }));

  const targetIndex = entries.items.findIndex(({ sys }) => sys.id === id);
  if (targetIndex === -1) {
    throw new Error('specified id is not found');
  }

  const result = entries.items[targetIndex];

  return {
    id: result.sys.id,
    title: result.fields.title,
    time: result.fields.time,
    day: result.fields.day,
    type: result.fields.type ?? '',
    summary: result.fields.summary ?? '',
    teachers: result.fields.teachers ?? [],
    comment: result.fields.comment ?? null,
    textbook: result.fields.textbook ?? null,
    evaluation: result.fields.evaluation ?? null,
    notes: result.fields.notes ?? null,
    officialUrl: result.fields.officialUrl ?? null,
    tags: result.fields.tags ?? [],
    reactions:
      result.fields?.reactions?.map(({ fields, sys }) => ({
        id: sys.id,
        content: fields.content,
      })) ?? [],
    nextClass:
      targetIndex < entries.items.length - 1
        ? {
            id: entries.items[targetIndex + 1].sys.id,
            title: entries.items[targetIndex + 1].fields.title,
          }
        : null,
    previousClass:
      targetIndex > 0
        ? {
            id: entries.items[targetIndex - 1].sys.id,
            title: entries.items[targetIndex - 1].fields.title,
          }
        : null,
  };
};
