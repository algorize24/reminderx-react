import { Text, StyleSheet } from "react-native";

// constants
import { Fonts } from "../../constants/Font";

export default function TextScreen({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});
