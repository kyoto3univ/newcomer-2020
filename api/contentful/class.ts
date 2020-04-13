import { Entry } from 'contentful';
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

export const fetchClassList = async () => {
  const result = await client.getEntries<ClassInfo>({
    content_type: 'ClassInfo',
    select: [
      'sys.id',
      'fields.title',
      'fields.day',
      'fields.time',
      'fields.type',
      'fields.summary',
      'fields.tags',
    ].join(','),
    limit: 500,
    order: 'fields.time',
  });

  return result.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    time: item.fields.time,
    day: item.fields.day,
    type: item.fields.type || null,
    summary: item.fields.summary || '',
    tags: item.fields.tags || [],
  }));
};

export const fetchClass = async (id: string) => {
  const result = await client.getEntry<ClassInfo>(id);

  return {
    id: result.sys.id,
    title: result.fields.title,
    time: result.fields.time,
    day: result.fields.day,
    type: result.fields.type || null,
    summary: result.fields.summary || '',
    teachers: result.fields.teachers || [],
    comment: result.fields.comment || null,
    textbook: result.fields.textbook || null,
    evaluation: result.fields.evaluation || null,
    notes: result.fields.notes || null,
    officialUrl: result.fields.officialUrl || null,
    tags: result.fields.tags || [],
    reactions:
      result.fields?.reactions?.map(({ fields, sys }) => ({
        id: sys.id,
        content: fields.content,
      })) || [],
  };
};
