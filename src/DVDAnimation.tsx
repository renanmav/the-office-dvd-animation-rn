import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { DVDLogo } from "./DVDLogo";
import { useRGBValues } from "./useRGBValues";

const DVD_LOGO_WIDTH = 210 / 1.5;
const DVD_LOGO_HEIGHT = 107 / 1.5;
const DURATION = 2 * 1000;
const config = { duration: DURATION };

type DVDAnimationProps = {
  width: number;
  height: number;
};

export function DVDAnimation({ width, height }: DVDAnimationProps) {
  const boundX = width - DVD_LOGO_WIDTH;
  const boundY = height - DVD_LOGO_HEIGHT;

  const { R, G, B } = useRGBValues();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(function moveDVD() {
    translateX.value = withSequence(
      withTiming(boundX, config),
      withTiming(0, config)
    );
    translateY.value = withSequence(
      withTiming(boundY, config),
      withTiming(0, config)
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
          r={R.value}
          g={G.value}
          b={B.value}
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
    // backgroundColor: "blue",
  },
  dvdView: {
    // backgroundColor: "red",
    width: DVD_LOGO_WIDTH,
    height: DVD_LOGO_HEIGHT,
  },
});
