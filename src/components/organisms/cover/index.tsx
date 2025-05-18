import { Text, View } from "react-native";
import { AppButton } from "../../atoms/button";
import styles from "./styles";

interface CoverProps {
  title: string;
  author: string;
  onStartReading: () => void;
}

export function Cover({ title, author, onStartReading }: CoverProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <AppButton text="Read" onPress={onStartReading} />
    </View>
  )
}