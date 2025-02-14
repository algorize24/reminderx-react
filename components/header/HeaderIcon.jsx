import { Pressable, StyleSheet } from "react-native";

// icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HeaderIcon({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.menuIcon}>
      <MaterialCommunityIcons name="menu" size={30} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    paddingRight: 12,
  },
});
