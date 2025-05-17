import { StyleSheet, Text } from 'react-native';

interface ParagraphProps {
  text: string;
}

export function Paragraph({ text }: ParagraphProps) {
  return <Text style={styles.paragraph}>{text}</Text>;
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 24,
    lineHeight: 24,
    color: '#333',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
}); 