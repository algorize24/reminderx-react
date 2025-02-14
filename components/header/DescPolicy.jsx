import { Text, StyleSheet } from "react-native";
import { Fonts } from "../../constants/Font";

export default function DescPolicy({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: Fonts.sub,
    marginBottom: 18,
  },
});
