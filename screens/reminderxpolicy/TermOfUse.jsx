import { Text, StyleSheet, ScrollView } from "react-native";

// components
import WelcomePolicy from "../../components/header/WelcomePolicy";
import ListTermOfUse from "../../components/desc/ListTermOfUse";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function TermOfUse() {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="never"
      style={styles.root}
    >
      <Text style={styles.text}>
        Reminde
        <Text style={styles.rx}>
          Rx <Text style={styles.text}>Term of Use</Text>
        </Text>
      </Text>
      <Text style={styles.textDate}>Effective Date: October 2024</Text>
      <WelcomePolicy
        welcome={
          'Welcome to RemindeRx: A Smart Medicine Storage and Wearable Fall Detection System with Mobile App Integration for Enhanced Health Management. Please read these Terms of Use ("Terms") carefully before using our services. By using the RemindeRx mobile app, website, or any related products or services, you agree to comply with and be bound by the following Terms. If you do not agree with these Terms, please do not use our Service.'
        }
      />

      <ListTermOfUse />
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
