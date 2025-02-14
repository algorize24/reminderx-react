import { Text, StyleSheet, Pressable } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function Button({ children, onPress, isEnable, style }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.root,
        !isEnable ? styles.disabled : styles.enabled, // Apply enabled or disabled styles based on isEnable
        pressed && isEnable && styles.pressed,
        style, // Apply pressed style only when enabled
      ]}
      onPress={isEnable ? onPress : null} // Disable press if button is not enabled
    >
      <Text style={[styles.text, !isEnable && styles.disabledText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderRadius: 33.5,
    alignItems: "center",
  },
  enabled: {
    backgroundColor: Color.purpleColor, // Original color when enabled
  },
  disabled: {
    backgroundColor: Color.purpleColor, // Gray color when the button is disabled
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 16,
    textAlign: "center",
  },
  disabledText: {
    color: "#ddd", // Light color for disabled text
  },
});
