import { View } from "react-native";
import MySlider from "../components/slider/Slider";

export default function Settings() {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <MySlider
        text={"Warmth"}
        iconMin={"snow-outline"}
        iconMax={"sunny-outline"}
      />
    </View>
  );
}
