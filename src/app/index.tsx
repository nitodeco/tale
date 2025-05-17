import { View } from "react-native";
import { Paragraph } from "../components/paragraph/Paragraph";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Paragraph text="Lorem ipsum dolor sit amet." />
    </View>
  );
}
