import { View, Text, StyleSheet } from "react-native";

import { Color } from "../../constants/Color";

export default function LoadingReminder() {
  return (
    <>
      <View style={styles.time}></View>
      <View style={styles.container}>
        <View style={styles.img}></View>
        <View style={styles.subContainer}>
          <View style={styles.text}></View>
          <View style={styles.desc}></View>

          <View></View>
        </View>
      </View>

      <View style={[styles.time, styles.times]}></View>
      <View style={styles.container}>
        <View style={styles.img}></View>
        <View style={styles.subContainer}>
          <View style={styles.text}></View>
          <View style={styles.desc}></View>

          <View></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "screen",
    backgroundColor: Color.container,
    height: 100,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  subContainer: {
    marginLeft: 10,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: Color.bgColor,
  },

  text: {
    width: 100,
    height: 20,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: Color.bgColor,
  },

  desc: {
    width: 200,
    height: 20,
    borderRadius: 5,
    backgroundColor: Color.bgColor,
  },

  time: {
    backgroundColor: Color.container,
    width: 80,
    height: 20,
    marginBottom: 10,
    borderRadius: 5,
  },

  times: {
    marginTop: 30,
  },
});
