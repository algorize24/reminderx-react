import { View, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";

export default function LoadingInventory() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <View style={styles.img}></View>
          <View style={styles.info}>
            <View style={styles.name}></View>
            <View style={styles.dosage}></View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.sub_container}>
          <View style={styles.img}></View>
          <View style={styles.info}>
            <View style={styles.name}></View>
            <View style={styles.dosage}></View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.container,
    borderRadius: 4,
    padding: 12,
    marginBottom: 15,
  },

  sub_container: {
    flexDirection: "row",
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Color.bgColor,
  },

  info: {
    marginLeft: 10,
  },

  name: {
    width: 150,
    height: 20,
    backgroundColor: Color.bgColor,
    borderRadius: 25,
  },

  dosage: {
    width: 100,
    height: 20,
    backgroundColor: Color.bgColor,
    borderRadius: 25,
    marginTop: 5,
  },
});
