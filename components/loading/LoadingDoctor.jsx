import { View, StyleSheet } from "react-native";

import { Color } from "../../constants/Color";
export default function LoadingDoctor() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.img}></View>
        <View style={styles.text}></View>
      </View>

      <View style={[styles.container, styles.subContainer]}>
        <View style={styles.img}></View>
        <View style={styles.text}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 10,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Color.container,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },

  subContainer: {
    marginTop: 10,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Color.bgColor,
  },

  text: {
    width: 200,
    height: 20,
    marginLeft: 12,
    borderRadius: 10,
    backgroundColor: Color.bgColor,
  },
});
