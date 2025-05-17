import { StyleSheet, Text } from 'react-native';

interface ParagraphPreviewProps {
  text: string;
}

export function ParagraphPreview({ text }: ParagraphPreviewProps) {
  return (
    <Text style={styles.paragraph}>{text}</Text>);
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 22,
    lineHeight: 24,
    color: '#BBB',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
}); 