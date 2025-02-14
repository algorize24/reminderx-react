import { View, Text, StyleSheet } from "react-native";

import { Fonts } from "../../../constants/Font";
import { Color } from "../../../constants/Color";

import AuthText from "../../../components/header/AuthText";

export default function HelpSupport() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <AuthText>Help & Support</AuthText>

        <Text style={styles.description}>
          At RemindeRx, we are dedicated to providing our users with the
          assistance they need to make the most of our smart health management
          system. Whether you have questions about setting up the mobile app,
          managing your medication schedules, or troubleshooting the wearable
          device, our support team is here to help.
        </Text>

        <Text style={styles.description}>How to Reach Us:</Text>
        <Text style={styles.description}>
          - For detailed inquiries or technical assistance, reach out to us at
          support@reminderx.com.
        </Text>
        <Text style={styles.description}>
          - Call our customer support at 1-800-REMINDERX for direct assistance.
        </Text>
        <Text style={styles.description}>
          - Our support team is available Monday to Friday, 9 AM – 6 PM (EST).
        </Text>

        <Text style={styles.description}>
          We are committed to ensuring that your experience with RemindeRx is
          seamless and stress-free. If you need further assistance, don’t
          hesitate to get in touch—we’re here to support you every step of the
          way.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  container: {
    marginTop: 20,
  },

  description: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 10,
  },
});
