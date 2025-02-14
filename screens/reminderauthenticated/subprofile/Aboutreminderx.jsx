import { View, Text, StyleSheet, Image } from "react-native";

import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

import AuthText from "../../../components/header/AuthText";

export default function Aboutreminderx() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <AuthText style={styles.text}>
          About Reminde<Text style={styles.rx}>Rx</Text>
        </AuthText>

        <Image
          style={styles.img}
          source={require("../../../assets/others/about.png")}
        />

        <Text style={styles.description}>
          RemindeRx is an innovative health management solution designed to
          improve medication adherence and ensure the safety of individuals,
          particularly the elderly and those with disabilities. Our system
          combines a smart medicine storage unit and a wearable fall detection
          device, seamlessly integrated with a mobile app. This all-in-one
          solution not only helps users manage their medication schedule through
          timely reminders but also ensures rapid response in case of falls or
          emergencies.
        </Text>

        <Text style={styles.description}>
          The mobile app provides caregivers and users with real-time monitoring
          and alerts, offering peace of mind through its easy-to-use interface
          and enhanced features such as health tracking, location monitoring,
          and customized medication intervals. By utilizing advanced sensor
          technology and a real-time database, RemindeRx strives to empower
          users to take control of their health while providing caregivers with
          tools to offer better support.
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

  rx: {
    color: Color.purpleColor,
  },

  description: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 10,
  },

  text: {
    textTransform: "none",
  },

  img: {
    width: "screen",
    height: 220,
    // margin: "auto",
  },
});
