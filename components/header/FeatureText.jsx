import { Text, StyleSheet } from "react-native";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function FeatureText({ style }) {
  return (
    <Text style={[styles.mainText, style]}>
      Reminde<Text style={styles.rx}>Rx</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontFamily: Fonts.main,
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },

  rx: {
    color: Color.purpleColor,
  },
});
