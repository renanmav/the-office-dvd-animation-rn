import { useEffect, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  DVD_LOGO_HEIGHT,
  DVD_LOGO_VELOCITY,
  DVD_LOGO_WIDTH,
} from "./constants";
import { DVDLogo } from "./DVDLogo";
import { useRGBValues } from "./useRGBValues";
import { withBouncing } from "./withBouncing";

type DVDAnimationProps = {
  width: number;
  height: number;
};

export function DVDAnimation({ width, height }: DVDAnimationProps) {
  const lowerBoundX = useMemo(() => 0, []);
  const lowerBoundY = useMemo(() => 0, []);
  const upperBoundX = useMemo(() => width - DVD_LOGO_WIDTH, []);
  const upperBoundY = useMemo(() => height - DVD_LOGO_HEIGHT, []);

  const { R, G, B, randomizeColor } = useRGBValues();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(function triggerDVDAnimation() {
    translateX.value = withBouncing(
      DVD_LOGO_VELOCITY,
      lowerBoundX,
      upperBoundX,
      randomizeColor
    );
    translateY.value = withBouncing(
      DVD_LOGO_VELOCITY,
      lowerBoundY,
      upperBoundY,
      randomizeColor
    );
  }, []);

  const dvdAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  return (
    <View style={{ width, height }}>
      <Animated.View style={[styles.dvdView, dvdAnimatedStyle]}>
        <DVDLogo
          r={R}
          g={G}
          b={B}
          width={DVD_LOGO_WIDTH}
          height={DVD_LOGO_HEIGHT}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  dvdView: {
    width: DVD_LOGO_WIDTH,
    height: DVD_LOGO_HEIGHT,
  },
});
