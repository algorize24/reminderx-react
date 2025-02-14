import { View, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";

export default function LoadingContact() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.img}></View>
        <View style={styles.textContainer}>
          <View style={styles.text}></View>
          <View style={styles.number}></View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.img}></View>
        <View style={styles.textContainer}>
          <View style={styles.text}></View>
          <View style={styles.number}></View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.container,
    width: "screen",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },

  img: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: Color.bgColor,
  },

  textContainer: {
    marginLeft: 10,
  },

  text: {
    width: 200,
    height: 20,
    backgroundColor: Color.bgColor,
    borderRadius: 5,
  },

  number: {
    width: 100,
    height: 20,
    backgroundColor: Color.bgColor,
    borderRadius: 5,
    marginTop: 5,
  },
});
