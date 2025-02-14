import { View, Text, Pressable, StyleSheet } from "react-native";

// constants
import { Fonts } from "../../constants/Font";

export default function Label({ children, onPress }) {
  return (
    <View style={styles.headerText}>
      <Text style={styles.info}>{children}</Text>
      <Pressable>
        <Text style={styles.text} onPress={onPress}>
          Add
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  info: {
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 16,
  },

  text: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 16,
  },
});
