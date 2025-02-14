import { View, Text, StyleSheet, Image } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function IsEmpty({ message, image }) {
  return (
    <View style={styles.root}>
      <Image style={styles.img} source={image} />
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
    color: Color.tagLine,
  },

  img: {
    width: 200,
    height: 200,
  },
});
