import { TextChunk } from '@/src/types/Book';
import { calculateHapticIntensity } from '@/src/utils/haptics';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, PanResponder, PanResponderGestureState, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface ReaderProps {
  items: TextChunk[];
  onReturnToCover: () => void;
  onFinish?: () => void;
}

export function Reader({ items, onReturnToCover, onFinish }: ReaderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderMove: () => {},
    
    onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (isDebouncing) return;
      
      if (Math.abs(gestureState.dy) > 20) {
        if (gestureState.dy > 0) {
          if (currentIndex > 0) {
            console.log(`Swiping to previous from ${currentIndex} to ${currentIndex - 1}`);
            handlePrevious();
          } else {
            console.log('At first page, returning to cover');
            onReturnToCover();
          }
        } 
        else if (gestureState.dy < 0 && currentIndex < items.length - 1) {
          console.log(`Swiping to next from ${currentIndex} to ${currentIndex + 1}`);
          handleNext();
        }
      } else if (Math.abs(gestureState.dx) < 10 && Math.abs(gestureState.dy) < 10) {
        handleTap();
      }
    },
  });

  const triggerTransitionHaptic = useCallback(() => {
    Haptics.impactAsync(calculateHapticIntensity(currentIndex, items.length));
  }, [currentIndex, items.length]);

  const animateTransition = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= items.length) {
      console.error(`Invalid index: ${newIndex}`);
      return;
    }

    console.log(`Going to index: ${newIndex}`);
    
    setIsTransitioning(true);
    triggerTransitionHaptic();
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(newIndex);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start(() => {
        setIsTransitioning(false);
        console.log(`Current index: ${newIndex}`);
      });
    });
  }, [fadeAnim, items.length, triggerTransitionHaptic]);

  const debounce = useCallback(() => {
    setIsDebouncing(true);
    setTimeout(() => {
      setIsDebouncing(false);
    }, 150);
  }, []);

  const onBookFinished = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await new Promise(resolve => setTimeout(resolve, 75));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise(resolve => setTimeout(resolve, 75));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(resolve => setTimeout(resolve, 75));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(resolve => setTimeout(resolve, 75));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(resolve => setTimeout(resolve, 100));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise(resolve => setTimeout(resolve, 150));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (onFinish) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onFinish();
    }
  }, [onFinish]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1 && !isDebouncing) {
      const newIndex = currentIndex + 1;
      console.log(`Navigate to next: ${currentIndex} -> ${newIndex}`);
      
      if (isTransitioning) {
        fadeAnim.stopAnimation();
        setIsTransitioning(false);
      }
      
      animateTransition(newIndex);
      debounce();
      
      if (newIndex === items.length - 1) {
        onBookFinished();
      }
    }
  }, [currentIndex, isTransitioning, items.length, isDebouncing, fadeAnim, debounce, animateTransition, onBookFinished]);

  const handleTap = useCallback(() => {
    if (currentIndex < items.length - 1 && !isDebouncing) {
      console.log('Tapped, navigating to next item');
      if (isTransitioning) {
        fadeAnim.stopAnimation();
        setIsTransitioning(false);
      }
      handleNext();
      debounce();
    }
  }, [currentIndex, isTransitioning, items.length, isDebouncing, fadeAnim, debounce, handleNext]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isDebouncing) {
      const newIndex = currentIndex - 1;
      console.log(`Navigate to previous: ${currentIndex} -> ${newIndex}`);
      
      if (isTransitioning) {
        fadeAnim.stopAnimation();
        setIsTransitioning(false);
      }
      
      animateTransition(newIndex);
      debounce();
    }
  }, [currentIndex, isTransitioning, isDebouncing, fadeAnim, debounce, animateTransition]);
  
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  const getPreviousPreview = () => {
    if (!hasPrevious) return null;
    const prevText = items[currentIndex - 1];

    return prevText.length > 30 
      ? `...${prevText.slice(-30)}` 
      : prevText;
  };

  const getNextPreview = () => {
    if (!hasNext) return null;
    const nextText = items[currentIndex + 1];

    return nextText.length > 30 
      ? `${nextText.slice(0, 30)}...` 
      : nextText;
  };

  useEffect(() => {
    console.log(`Current index: ${currentIndex}, Can go previous: ${hasPrevious}, Can go next: ${hasNext}`);
  }, [currentIndex, hasPrevious, hasNext]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ backgroundColor: 'transparent' }}
        onPress={handlePrevious}
        disabled={!hasPrevious || isDebouncing}
      />
      
      <View 
        {...panResponder.panHandlers}
        style={styles.previewContainer}
      >
        <View style={styles.previewSpace}>
          {hasPrevious ? (
            <Text style={styles.previewText}>
              {getPreviousPreview()}
            </Text>
          ) : (
            <Text style={[styles.previewText, { color: 'transparent' }]}>
              Start
            </Text>
          )}
        </View>

        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          {items.length > 0 ? (
            <Text style={styles.carousel}>{items[currentIndex]}</Text>
          ) : (
            <Text style={styles.emptyText}>No items to display</Text>
          )}
        </Animated.View>

        <View style={styles.previewSpace}>
          {hasNext ? (
            <Text style={styles.previewText}>
              {getNextPreview()}
            </Text>
          ) : (
            <Text style={[styles.previewText, { color: 'transparent' }]}>
              End
            </Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity
        style={{ backgroundColor: 'transparent' }}
        onPress={handleNext}
        disabled={!hasNext || isDebouncing}
      />
    </View>
  );
}
