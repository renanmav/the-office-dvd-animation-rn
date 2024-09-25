import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { LayoutRectangle, StyleSheet, Text, View } from "react-native";
import { DVDAnimation } from "./src/DVDAnimation";

// TODO: add support for react-native-web
export default function App() {
  const [layoutState, setLayout] = useState<null | LayoutRectangle>(null);

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => {
        setLayout(layout);
      }}
    >
      {layoutState && (
        <DVDAnimation width={layoutState.width} height={layoutState.height} />
      )}

      {/* TODO: add support for dark mode */}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
