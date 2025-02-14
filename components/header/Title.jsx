import { Text, StyleSheet } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function Title({}) {
  return (
    <>
      <Text style={styles.mainText}>
        Reminde<Text style={styles.subText}>Rx</Text>
      </Text>
      <Text style={styles.tagline}>Safe. Smart. Connected</Text>
    </>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontFamily: Fonts.main,
    fontSize: 32,
    color: "white",
  },

  subText: {
    color: Color.purpleColor,
  },

  tagline: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    fontSize: 14,
  },
});
