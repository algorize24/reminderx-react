import { View, Text, Image, StyleSheet } from "react-native";

import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function TeamProfile({ src, name, title }) {
  return (
    <View style={styles.profile}>
      <Image style={styles.img} source={src} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: Color.container,
    padding: 15,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  textContainer: {
    marginLeft: 10,
  },

  name: {
    fontFamily: Fonts.main,
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },

  title: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    textTransform: "capitalize",
    maxWidth: 280,
    fontSize: 13,
  },
});
