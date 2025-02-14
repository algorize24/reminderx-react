import { View, Text, StyleSheet, Image } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ErrorComponent({ message }) {
  return (
    <View style={styles.root}>
      <Image
        style={styles.img}
        source={require("../../assets/others/error.png")}
      />
      <Text style={styles.textLength}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textLength: {
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.main,
    textAlign: "center",
    color: Color.redColor,
  },

  img: {
    width: 150,
    height: 150,
  },
});
