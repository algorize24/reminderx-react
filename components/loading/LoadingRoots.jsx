import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function LoadingRoots() {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" color={Color.purpleColor} />

      <Text style={styles.text}>Logging Out...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    marginTop: 5,
  },
});
