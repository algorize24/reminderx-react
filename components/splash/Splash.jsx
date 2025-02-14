import { View, Image, StyleSheet } from "react-native";
export default function Splash() {
  return (
    <View style={styles.root}>
      <Image
        source={require("../../assets/splash.png")}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    flex: 1,
    width: "55%",
    height: "100%",
  },
});
