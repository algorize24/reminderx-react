import { View, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
export default function LoadingProfile() {
  return (
    <View style={styles.root}>
      <View style={styles.image}></View>
      <View style={styles.text}></View>
      <View style={styles.textadd}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Color.container,
    marginBottom: 10,
  },

  text: {
    backgroundColor: Color.container,
    width: 200,
    height: 15,
    borderRadius: 15,
    marginBottom: 5,
  },

  textadd: {
    backgroundColor: Color.container,
    width: 250,
    height: 15,
    borderRadius: 15,
  },
});
