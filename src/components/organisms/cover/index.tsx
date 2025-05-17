import { Button, Text, View } from "react-native";
import styles from "./styles";

interface CoverProps {
  title: string;
  author: string;
  onStartReading: () => void;
}

export function Cover({ title, author, onStartReading }: CoverProps) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
      <Button title="Read" onPress={onStartReading} />
    </View>
  )
}