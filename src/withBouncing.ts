import { defineAnimation, runOnJS } from "react-native-reanimated";
import type { Animation } from "react-native-reanimated/lib/types/reanimated2/commonTypes";

interface BouncingAnimationState extends Animation<BouncingAnimationState> {
  lastTimestamp: number;
  direction: -1 | 1;
}

export function withBouncing(
  velocity: number,
  lowerBound: number,
  upperBound: number,
  onBounce: () => void
) {
  "worklet";
  return defineAnimation(undefined, () => {
    "worklet";

    const onFrame = (state: BouncingAnimationState, now: number) => {
      const delta = now - state.lastTimestamp;
      const translation = (delta / 1000) * velocity;

      state.current = (state.current as number) + state.direction * translation;

      if (state.current > upperBound || state.current < lowerBound) {
        state.direction *= -1;
        runOnJS(onBounce)();
      }

      state.lastTimestamp = now;

      return false;
    };

    const onStart = (
      state: BouncingAnimationState,
      _value: number,
      now: number
    ) => {
      state.current = lowerBound + Math.random() * upperBound;
      state.lastTimestamp = now;
      state.direction = 1;
    };

    return {
      onFrame,
      onStart,
    };
  });
}
