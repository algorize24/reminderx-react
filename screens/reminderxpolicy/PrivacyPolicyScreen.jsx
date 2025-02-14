import { Text, ScrollView, StyleSheet } from "react-native";

// components
import ListPrivacyPolicy from "../../components/desc/ListPrivacyPolicy";
import WelcomePolicy from "../../components/header/WelcomePolicy";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="never"
      style={styles.root}
    >
      <Text style={styles.text}>
        Reminde
        <Text style={styles.rx}>
          Rx <Text style={styles.text}>Privacy Policy</Text>
        </Text>
      </Text>
      <Text style={styles.textDate}>Effective Date: October 2024</Text>

      <WelcomePolicy
        welcome={
          "At RemindeRx, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile app, website, and related services. By accessing or using the Service, you consent to the data practices described in this Privacy Policy. If you do not agree with this policy, please do not use the Service."
        }
      />

      <ListPrivacyPolicy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
    paddingHorizontal: 14,
  },

  text: {
    fontFamily: Fonts.main,
    fontSize: 18,
    color: "white",
  },

  textDate: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
  },

  rx: {
    color: Color.purpleColor,
  },
});
