import { useCallback, useState } from "react";

const buildRandomColor = () => Math.random() * 255;

export function useRGBValues() {
  const [R, setR] = useState(buildRandomColor());
  const [G, setG] = useState(buildRandomColor());
  const [B, setB] = useState(buildRandomColor());

  const randomizeColor = useCallback(() => {
    setR(buildRandomColor());
    setG(buildRandomColor());
    setB(buildRandomColor());
  }, []);

  return {
    R,
    G,
    B,
    randomizeColor,
  };
}
