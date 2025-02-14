import { Pressable, Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function MainButton({
  children,
  onPress,
  style,
  textStyle,
  pressedStyle,
  disabled,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.root,
        pressed && styles.pressed,
        pressedStyle,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 12,
    borderRadius: 33.5,
    alignItems: "center",
    backgroundColor: Color.purpleColor,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 16,
    textAlign: "center",
  },
});
