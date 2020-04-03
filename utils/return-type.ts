export type ExtractPromise<T> = T extends Promise<infer R> ? R : unknown;
