import { Text, View } from "react-native";
import { AppButton } from "../../atoms/button";
import styles from "./styles";

interface CoverProps {
  title: string;
  author: string;
  readingTimeString: string;
  onStartReading: () => void;
}

export function Cover({ title, author, readingTimeString, onStartReading }: CoverProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.readingTime}>~ {readingTimeString} min</Text>
        <AppButton text="Read" onPress={onStartReading} />
      </View>
    </View>
  )
}