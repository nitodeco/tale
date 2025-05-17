import Storage from "expo-sqlite/kv-store";
import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import MySlider from "../components/slider/Slider";

export default function Settings() {
  let [savedWarmth, setSavedWarmth] = useState(0);
  let [savedContrast, setSavedContrast] = useState(0);

  try {
    let warmth = Storage.getItemSync("warmth");
    if (warmth) setSavedWarmth(parseInt(warmth));
  } catch {}
  try {
    let contrast = Storage.getItemSync("contrast");
    if (contrast) setSavedContrast(parseInt(contrast));
  } catch {}

  let [warmth, setWarmth] = useState(savedWarmth);
  let [contrast, setContrast] = useState(savedContrast);

  useEffect(() => {
    console.log(`Varmoća je sad ${warmth} bičiz ;P`);
    console.log(`Kontrast je sad ${contrast} bičiz ;P`);
  }, [warmth, contrast]);

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
        value={warmth}
        setValue={setWarmth}
      />
      <MySlider
        text={"Warmth"}
        iconMin={"ellipse-outline"}
        iconMax={"contrast-outline"}
        value={contrast}
        setValue={setContrast}
      />
      <Button title="Save changes" />
    </View>
  );
}
