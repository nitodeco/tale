import * as Haptics from 'expo-haptics';

export const calculateHapticIntensity = (currentIndex: number, totalItems: number): Haptics.ImpactFeedbackStyle => {
  const relativeProgress = currentIndex / totalItems;

  if (relativeProgress < 0 || relativeProgress > 1) {
    throw new Error('Relative progress must be between 0 and 1');
  }

  if (relativeProgress < 0.3) {
    return Haptics.ImpactFeedbackStyle.Light;
  }

  if (relativeProgress >= 0.3 && relativeProgress < 0.7) {
    return Haptics.ImpactFeedbackStyle.Medium;
  }

  if (relativeProgress >= 0.7) {
    return Haptics.ImpactFeedbackStyle.Heavy;
  }

  return Haptics.ImpactFeedbackStyle.Light;
}