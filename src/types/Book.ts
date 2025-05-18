export type TextChunk = string;

export type Chapter = {
  title: string;
  paragraphs: TextChunk[];
}

export type Book = {
  title: string;
  author: string;
  chapters: Chapter[];
}