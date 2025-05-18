import { AppState, Dimensions, View } from "react-native";
import styles from "./styles";

import { useCallback, useEffect } from "react";
import Animated, { Easing, useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface YarnProps {
  width?: number
  height?: number
  borderRadius?: number
  lineColor?: string
  lineWidth?: number
  backgroundColor?: string
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

const FIFTEEN_MINUTES = 15 * 60 * 1000

export const Yarn = ({
  width = Dimensions.get("window").width - 40,
  height = 200,
  borderRadius = 12,
  lineColor = "#6D3D14",
  lineWidth = 1,
  backgroundColor = "transparent",
}: YarnProps) => {
  const perimeter = 2 * (width + height)

    const createPath = () => {
    const padding = 8
    const adjustedWidth = width - padding
    const adjustedHeight = height - padding
    const adjustedRadius = Math.max(0, borderRadius - padding / 2)
    
    const amplitude = adjustedHeight / 196
    const frequency = 8
    
    const offsetX = padding / 2
    const offsetY = padding / 2
    
    let path = `M ${adjustedRadius + offsetX} ${offsetY}`
    
    const topSteps = 20
    const topStep = (adjustedWidth - 2 * adjustedRadius) / topSteps
    for (let i = 1; i <= topSteps; i++) {
      const x = adjustedRadius + offsetX + i * topStep
      const y = offsetY + Math.sin(i / topSteps * Math.PI * frequency) * amplitude
      path += ` L ${x} ${y}`
    }
    
    path += ` A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${adjustedWidth + offsetX} ${adjustedRadius + offsetY}`
    
    const rightSteps = 30
    const rightStep = (adjustedHeight - 2 * adjustedRadius) / rightSteps
    for (let i = 1; i <= rightSteps; i++) {
      const y = adjustedRadius + offsetY + i * rightStep
      const x = adjustedWidth + offsetX + Math.sin(i / rightSteps * Math.PI * frequency) * amplitude
      path += ` L ${x} ${y}`
    }
    
    path += ` A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${adjustedWidth + offsetX - adjustedRadius} ${adjustedHeight + offsetY}`
    
    const bottomSteps = 40
    const bottomStep = (adjustedWidth - 2 * adjustedRadius) / bottomSteps
    for (let i = bottomSteps; i >= 1; i--) {
      const x = adjustedRadius + offsetX + i * bottomStep
      const y = adjustedHeight + offsetY + Math.sin(i / bottomSteps * Math.PI * frequency) * amplitude
      path += ` L ${x} ${y}`
    }
    
    path += ` A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${offsetX} ${adjustedHeight + offsetY - adjustedRadius}`
    
    const leftSteps = 30
    const leftStep = (adjustedHeight - 2 * adjustedRadius) / leftSteps
    for (let i = leftSteps; i >= 1; i--) {
      const y = adjustedRadius + offsetY + i * leftStep
      const x = offsetX + Math.sin(i / leftSteps * Math.PI * frequency) * amplitude
      path += ` L ${x} ${y}`
    }
    
    path += ` A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${adjustedRadius + offsetX} ${offsetY}`
    
    return path
  }

  const path = createPath()
  const pathLength = useSharedValue(perimeter)
  const animationProgress = useSharedValue(0)

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: pathLength.value * (1 - animationProgress.value),
    }
  })

  const startAnimation = useCallback(() => {
    animationProgress.value = 0;
    animationProgress.value = withTiming(1, {
      duration: FIFTEEN_MINUTES,
      easing: Easing.linear,
    }, () => {
      animationProgress.value = 1;
    });
  }, [animationProgress]);

  useEffect(() => {
    pathLength.value = perimeter;
    startAnimation();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
      } else if (nextAppState === 'active') {
        animationProgress.value = 0;
        startAnimation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [animationProgress, pathLength, perimeter, startAnimation]);

  return (
    <View style={[styles.container, { width, height, borderRadius, backgroundColor, zIndex: 2 }]}>
      <Svg width={width} height={height}>
        <AnimatedPath
          d={path}
          stroke={lineColor}
          strokeWidth={lineWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength.value}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  )
}
