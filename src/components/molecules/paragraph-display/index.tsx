import { View } from "react-native";
import {
  Paragraph
} from '../../atoms/paragraph';
import { ParagraphPreview } from '../../atoms/paragraph-preview';

interface ParagraphDisplayProps {
  previousText: string;
  currentText: string;
  nextText: string;
}

export function ParagraphDisplay({ previousText, currentText, nextText }: ParagraphDisplayProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <ParagraphPreview text={previousText} />
      <Paragraph text={currentText} />
      <ParagraphPreview text={nextText} />
    </View>
  )
}