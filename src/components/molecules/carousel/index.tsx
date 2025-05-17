import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, PanResponder, PanResponderGestureState, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface CarouselProps {
  items: string[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isTransitioning,
    onMoveShouldSetPanResponder: () => !isTransitioning,
    
    onPanResponderMove: () => {},
    
    onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (isTransitioning) return;
      
      if (Math.abs(gestureState.dy) > 20) {
        if (gestureState.dy > 0 && currentIndex > 0) {
          console.log(`Swiping to previous from ${currentIndex} to ${currentIndex - 1}`);
          handlePrevious();
        } 
        else if (gestureState.dy < 0 && currentIndex < items.length - 1) {
          console.log(`Swiping to next from ${currentIndex} to ${currentIndex + 1}`);
          handleNext();
        }
      }
    },
  });

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      const newIndex = currentIndex - 1;
      console.log(`Navigate to previous: ${currentIndex} -> ${newIndex}`);
      animateTransition(newIndex);
    }
  }, [currentIndex, isTransitioning]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1 && !isTransitioning) {
      const newIndex = currentIndex + 1;
      console.log(`Navigate to next: ${currentIndex} -> ${newIndex}`);
      animateTransition(newIndex);
    }
  }, [currentIndex, isTransitioning, items.length]);

  const triggerTransitionHaptic = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

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
        style={[styles.navButton, styles.topButton, !hasPrevious && styles.disabledButton]}
        onPress={handlePrevious}
        disabled={!hasPrevious || isTransitioning}
      >
        <Ionicons name="chevron-up" size={24} color={hasPrevious ? "#333" : "#ccc"} />
      </TouchableOpacity>
      
      <View 
        {...panResponder.panHandlers}
        style={styles.previewContainer}
      >
        {hasPrevious && (
          <Text style={styles.previewText}>
            {getPreviousPreview()}
          </Text>
        )}

        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          {items.length > 0 ? (
            <Text style={styles.carousel}>{items[currentIndex]}</Text>
          ) : (
            <Text style={styles.emptyText}>No items to display</Text>
          )}
        </Animated.View>

        {hasNext && (
          <Text style={styles.previewText}>
            {getNextPreview()}
          </Text>
        )}
      </View>
      
      <TouchableOpacity
        style={[styles.navButton, styles.bottomButton, !hasNext && styles.disabledButton]}
        onPress={handleNext}
        disabled={!hasNext || isTransitioning}
      >
        <Ionicons name="chevron-down" size={24} color={hasNext ? "#333" : "#ccc"} />
      </TouchableOpacity>
    </View>
  );
}
