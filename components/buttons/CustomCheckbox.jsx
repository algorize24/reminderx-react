// this component rendered in PolicyScreen.jsx
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

// useNavigation
import { useNavigation } from "@react-navigation/native";

// icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function CustomCheckbox({ onCheckedLawChange }) {
  // state for pressable
  const [checkedUX, setCheckedUX] = useState(false);
  const [checkedLaw, setCheckedLaw] = useState(false);

  const navigation = useNavigation();

  // for user exp. improvement and terms of use
  const UXHandler = () => {
    navigation.navigate("TermOfUse");
  };

  // privacy policy
  const PrivacyHandler = () => {
    navigation.navigate("PrivacyPolicy");
  };

  // check if the user checked the checkbox
  const handleLawCheckboxPress = () => {
    const newCheckedLaw = !checkedLaw;
    setCheckedLaw(newCheckedLaw);
    onCheckedLawChange(newCheckedLaw); // Notify parent component
  };

  return (
    <View style={styles.root}>
      <View style={styles.checkBoxContainer}>
        <Pressable
          style={styles.pressableBox}
          onPress={() => setCheckedUX(!checkedUX)}
        >
          <MaterialCommunityIcons
            name={
              checkedUX
                ? "checkbox-marked-circle"
                : "checkbox-blank-circle-outline"
            }
            size={24}
            color="white"
          />
        </Pressable>

        <Text style={styles.mainText}>
          I confirm to join the{" "}
          <Text onPress={UXHandler} style={styles.linkText}>
            {" "}
            User Experience Improvement Program{" "}
          </Text>
          . I understand that I can opt out of the program at any time.
        </Text>
      </View>

      <View style={styles.checkBoxContainer}>
        <Pressable style={styles.pressableBox} onPress={handleLawCheckboxPress}>
          <MaterialCommunityIcons
            name={
              checkedLaw
                ? "checkbox-marked-circle"
                : "checkbox-blank-circle-outline"
            }
            size={24}
            color="white"
          />
        </Pressable>

        <Text style={styles.mainText}>
          I accept the{" "}
          <Text onPress={UXHandler} style={styles.linkText}>
            {" "}
            Terms of Use{" "}
          </Text>{" "}
          and confirm that I have fully read and understood the{" "}
          <Text onPress={PrivacyHandler} style={styles.linkText}>
            Privacy Policy{" "}
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    marginBottom: 20,
  },
  checkBoxContainer: {
    flexDirection: "row",
  },

  pressableBox: {
    marginRight: 22,
  },

  mainText: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    fontSize: 12,
    marginBottom: 20,
    maxWidth: 310,
  },

  linkText: {
    color: Color.purpleColor,
  },
});
