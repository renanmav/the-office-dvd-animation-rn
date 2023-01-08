import { useSharedValue } from "react-native-reanimated";

export function useRGBValues() {
  const R = useSharedValue(Math.random() * 255);
  const G = useSharedValue(Math.random() * 255);
  const B = useSharedValue(Math.random() * 255);

  return {
    R,
    G,
    B,
  };
}
