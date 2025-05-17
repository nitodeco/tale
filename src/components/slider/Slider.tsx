import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

interface MySliderProps {
  text: string;
  iconMin: string;
  iconMax: string;
  value: number;
  setValue: any; // I hate this but okay
}

export default function MySlider({
  text,
  iconMin,
  iconMax,
  value,
  setValue,
}: MySliderProps) {
  return (
    <View style={styles.mySlider}>
      <Text>{text}</Text>
      <View style={styles.view}>
        <Ionicons name={iconMin} size={24} color="black" />
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#1FB28A"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1FB28A"
            value={value}
            onValueChange={setValue}
          />
          <Ionicons name={iconMax} size={24} color="black" />
        </View>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  mySlider: {
    flexDirection: "column",
    width: "100%",
  },
  view: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between", // make it breathe
  },
  icon: {
    width: 20,
    height: 20,
  },
  sliderContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
    height: 20,
  },
});
