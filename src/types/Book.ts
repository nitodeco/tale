export type TextChunk = string;

export type Paragraph = {
  text: TextChunk;
  wordCount: number;
}

export type Chapter = {
  title: string;
  paragraphs: Paragraph[];
}

export type Book = {
  title: string;
  author: string;
  chapters: Chapter[];
}