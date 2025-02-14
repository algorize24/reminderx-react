import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
export default function LoadingNotif() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.sub_container}>
          <View style={styles.img}></View>
          <View style={styles.data_container}>
            <View style={styles.name}></View>
            <View style={styles.description}></View>
          </View>
        </View>
      </View>

      <View style={[styles.container, styles.gap]}>
        <View style={styles.sub_container}>
          <View style={styles.img}></View>
          <View style={styles.data_container}>
            <View style={styles.name}></View>
            <View style={styles.description}></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 30,
  },

  gap: {
    marginTop: 20,
  },

  container: {
    backgroundColor: Color.container,
    borderRadius: 10,
    paddingVertical: 15,
  },

  sub_container: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  data_container: {
    marginLeft: 10,
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: Color.bgColor,
  },

  name: {
    width: 100,
    height: 30,
    backgroundColor: Color.bgColor,
    borderRadius: 10,
  },

  description: {
    marginTop: 10,
    width: 250,
    height: 30,
    backgroundColor: Color.bgColor,
    borderRadius: 10,
  },
});
