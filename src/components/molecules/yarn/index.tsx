import { Dimensions, View } from "react-native";
import styles from "./styles";

import { useEffect } from "react";
import Animated, { Easing, useAnimatedProps, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
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

const FIFTEEN_MINUTES = 15 * 60 * 100

export const Yarn = ({
  width = Dimensions.get("window").width - 40,
  height = 200,
  borderRadius = 12,
  lineColor = "#000",
  lineWidth = 2,
  backgroundColor = "#FFF",
}: YarnProps) => {
  const perimeter = 2 * (width + height)

  const createPath = () => {
    const adjustedWidth = width - lineWidth
    const adjustedHeight = height - lineWidth
    const adjustedRadius = Math.max(0, borderRadius - lineWidth / 2)

    return `
      M ${adjustedRadius + lineWidth / 2} ${lineWidth / 2}
      H ${adjustedWidth - adjustedRadius}
      A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${adjustedWidth} ${adjustedRadius + lineWidth / 2}
      V ${adjustedHeight - adjustedRadius}
      A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${adjustedWidth - adjustedRadius} ${adjustedHeight}
      H ${adjustedRadius + lineWidth / 2}
      A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${lineWidth / 2} ${adjustedHeight - adjustedRadius}
      V ${adjustedRadius + lineWidth / 2}
      A ${adjustedRadius} ${adjustedRadius} 0 0 1 ${adjustedRadius + lineWidth / 2} ${lineWidth / 2}
    `
  }

  const path = createPath()
  const pathLength = useSharedValue(perimeter)
  const animationProgress = useSharedValue(0)

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: pathLength.value * (1 - animationProgress.value),
    }
  })

  useEffect(() => {
    pathLength.value = perimeter

    animationProgress.value = withRepeat(
      withTiming(1, {
        duration: FIFTEEN_MINUTES,
        easing: Easing.linear,
      }),
      -1,
      false,
    )
  }, [animationProgress, pathLength, perimeter])

  return (
    <View style={[styles.container, { width, height, borderRadius, backgroundColor }]}>
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
