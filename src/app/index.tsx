import * as Haptics from 'expo-haptics';
import { useState } from "react";
import { View } from "react-native";
import { Cover } from "../components/organisms/cover";
import { Reader } from "../components/organisms/reader";
import { TextChunk } from "../types/Book";

export const story: TextChunk[] = [
  "\"Every living being has the right to shelter,\" said Miechka, who was driving.",
  "\"To a shelter overrun by bushes,\" replied her sister Lilichka.",
  "Before they started talking, they were absolutely different.",
  "One’s hair was wavy, the other’s hair so straight it almost made her look Chinese.",
  "Miechka’s cheeks had a peachy shade to them, while Lilichka was pale, like she’d spent her whole life in a concrete bunker that never got any sunlight.",
  "Yet, as soon as the two sisters began speaking, a certain similarity emerged.",
  "With every word, their eyes, lips, ears, and movements blended together more and more.",
  "Whoever was conversing with them could close their eyes and say, \"Who’s even talking?\"",
  "Then they’d exchange a glance, fall silent for a moment, and become as different as night and day.",
  "They came to the overgrown shelter for losers whenever they had no other choice.",
  "That didn’t require a tragedy – sometimes everything just seemed foggy.",
  "It was a structure with large, disproportionate windows and a rotten deck overrun by bushes.",
  "Raspberries, blackberries, barley, tall poplars, birches, wild plums, apples, and pears grew around it.",
  "They grew up amid those bushes, lost the battle to the thickets, and then left.",
  "The shelter stood, reproaching the past for the fact that things would never be like they used to be.",
  "Never again would all of us sleep in groups of three.",
  "Never again would the men say \"I’m going to sleep outside,\" and lie down on planks under the trees.",
  "They'd spend all night shaking off stray bats, cats, and insects with innumerable legs.",
  "All of those people scattered, died, or disappeared long ago.",
  "\"Hand me Honcharov’s vase,\" Grandma said.",
  "Nobody in the house had any idea who Honcharov was, but the vase was named after him.",
  "Before the shelter, there used to be a house here.",
  "Then implacable time mashed it up, leaving behind a collapsed roof and a barn full of dirt.",
  "A heart-warming ladder by a window for birds remained, but only the occasional yellow oriole visited.",
  "Back in the day, Grandma’s husband brought her to this place from her fifth-floor apartment downtown.",
  "He took her away from her parents’ fig trees, library, and gold-embroidered tablecloth.",
  "\"Is this the paradise you were telling me about?\" Theodora asked.",
  "\"This is it,\" came the response.",
  "She loved that voice so much she didn’t need any fig trees whatsoever.",
  "Decades passed. The old house vanished, and a new one matured and grew old with Theodora.",
  "Her children grew up here and left. Her grandchildren did too. Her great-grandchildren played here.",
  "Now, nearly a hundred, Theodora sat on the rotten deck, waiting for her granddaughters.",
  "They fled to the shelter due to dead parrots and turtles, then professional crises, relationships, children.",
  "Here, Lilichka lulled her sons to sleep, even though they usually drove her insane.",
  "At the shelter, her children calmed down and crawled through blueberries, scratching their bellies.",
  "Miechka would decide where to head next, though ideas never came here – only the belief that they would.",
  "Here, you could come to terms with your lack of ideas while slicing through thickets.",
  "\"I shudder to think what people who don’t have a house overgrown with wild raspberries do,\" said Lilichka.",
  "She brought open-toed heels for Miechka, found in the attic after forty years.",
  "Grandma bought them in Vilnius long ago, but they didn’t fit her.",
  "Who could’ve guessed they’d fit her two granddaughters’ four feet perfectly?",
  "\"Granny’ll fall over when you step out of the car,\" Lilichka said, eyeing her sister’s dress.",
  "Lilichka was beautiful – dark glasses, T-shirt with nothing underneath, and holey jeans.",
  "\"And she’ll ask you why you can’t dress like your sister,\" Miechka replied.",
  "\"She has no clue you wear that sack-of-potatoes dress most of the time,\" Lilichka said.",
  "\"At least it’s short.\"",
  "\"Yeah, and it’s short to boot!\"",
  "They stopped at a gas station.",
  "The first sweltering sun of June shone bright.",
  "Strawberries of their childhood ripened under the apple trees.",
  "Miechka took a sky blue sarafan with white flowers from her suitcase.",
  "\"Oh!\" Lilichka said.",
  "\"Put it on!\" Miechka said, smiling.",
  "Lilichka opened the car door and slid the sarafan over her knees.",
  "\"Granny’ll fall over, that’s for sure,\" Lilichka said.",
  "For the first time in eight years, they’d need the whole summer to rehabilitate.",
  "They emailed husbands, boyfriends, exes, and set a schedule for the kids.",
  "\"Remember how summer used to go on forever. Didn’t it?\" Miechka said.",
  "Lilichka nodded, holding the wheel with one hand.",
  "With the other, she rubbed an apple on her knee, on the airy wave of the sarafan.",
  "That’s what they always did – when one adjusted a strap, the other took the wheel.",
  "They arrived in the early evening."
];

const readingTimeMinutes = 3;
const readingTimeSeconds = 58;
const readingTimeString = `${readingTimeMinutes}:${readingTimeSeconds}`;

export default function Index() {
  const [chunks] = useState<TextChunk[]>(story);
  const [isReading, setIsReading] = useState(false);

  const sequenceHaptics = async (iterations: number) => {
    for (let i = 0; i < iterations; i++) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await new Promise(resolve => setTimeout(resolve, 100 / (i + 1)));
    }
  };

  const handleStartReading = async () => {
    sequenceHaptics(10);
    setIsReading(true);
  };

  return (
    <View
      style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
          backgroundColor: "#FFF3DA",
          zIndex: 1,
        }}
    >
      {isReading ? <Reader items={chunks} onReturnToCover={() => setIsReading(false)} onFinish={() => setIsReading(false)}/> : <Cover title="Ask Miechka" author="Eugenia Kuznetsova" readingTimeString={readingTimeString} onStartReading={handleStartReading} />}
    </View>
  );
}
