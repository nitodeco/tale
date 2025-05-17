import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface ButtonProps {
  text: string;
  onPress: () => void;
}

export function AppButton({ text, onPress }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}