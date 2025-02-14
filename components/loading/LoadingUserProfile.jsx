import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
export default function LoadingUserProfile() {
  return (
    <View style={styles.root}>
      <View style={styles.img}></View>
      <View>
        <View style={styles.text}></View>
        <View style={styles.address}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: Color.container,
  },

  text: {
    marginLeft: 10,
    width: 150,
    height: 20,
    backgroundColor: Color.container,
    borderRadius: 20,
    marginBottom: 5,
  },

  address: {
    marginLeft: 10,
    width: 250,
    height: 20,
    backgroundColor: Color.container,
    borderRadius: 20,
  },
});
