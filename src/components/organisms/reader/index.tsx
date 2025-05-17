import { Carousel } from "@/src/components/molecules/carousel";
import { TextChunk } from "@/src/types/Book";

interface ReaderProps {
  chunks: TextChunk[];
}

export function Reader({ chunks }: ReaderProps) {
  return (
    <Carousel items={chunks} />
  )
}