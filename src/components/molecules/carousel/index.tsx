import { Ionicons } from '@expo/vector-icons';
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
  
  // Create new panResponder every time currentIndex changes to ensure it has latest value
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !isTransitioning,
    onMoveShouldSetPanResponder: () => !isTransitioning,
    
    onPanResponderMove: () => {},
    
    onPanResponderRelease: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      if (isTransitioning) return;
      
      // Debug the values
      console.log(`Gesture detected: dy=${gestureState.dy}, currentIndex=${currentIndex}`);
      
      // Check for vertical movement
      if (Math.abs(gestureState.dy) > 20) {
        // Swipe down -> previous
        if (gestureState.dy > 0 && currentIndex > 0) {
          console.log(`Swiping to previous from ${currentIndex} to ${currentIndex - 1}`);
          handlePrevious();
        } 
        // Swipe up -> next
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

  const animateTransition = useCallback((newIndex: number) => {
    // Guard against invalid indices
    if (newIndex < 0 || newIndex >= items.length) {
      console.error(`Invalid index: ${newIndex}`);
      return;
    }

    console.log(`Starting transition to index: ${newIndex}`);
    
    // Set transitioning state to prevent multiple animations at once
    setIsTransitioning(true);
    
    // Fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      // Update index
      console.log(`Setting index to: ${newIndex}`);
      setCurrentIndex(newIndex);
      
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        // Animation complete
        setIsTransitioning(false);
        console.log(`Transition complete, now at index: ${newIndex}`);
      });
    });
  }, [fadeAnim, items.length]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  // Get preview text for previous and next items
  const getPreviousPreview = () => {
    if (!hasPrevious) return null;
    const prevText = items[currentIndex - 1];
    // Take last 30 characters or the whole text if shorter
    return prevText.length > 30 
      ? `...${prevText.slice(-30)}` 
      : prevText;
  };

  const getNextPreview = () => {
    if (!hasNext) return null;
    const nextText = items[currentIndex + 1];
    // Take first 30 characters or the whole text if shorter
    return nextText.length > 30 
      ? `${nextText.slice(0, 30)}...` 
      : nextText;
  };

  // Debug logging
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
