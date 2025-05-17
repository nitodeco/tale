import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

interface MySliderProps {
  text: string;
  iconMin: string;
  iconMax: string;
}

export default function MySlider({ text, iconMin, iconMax }: MySliderProps) {
  return (
    <View style={styles.mySlider}>
      <Text>Warmth</Text>
      <View style={styles.view}>
        <Ionicons name={iconMin} size={24} color="black" />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1FB28A"
        />
        <Ionicons name={iconMax} size={24} color="black" />
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  mySlider: {
    flexDirection: "column",
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
    height: 20,
  },
});
