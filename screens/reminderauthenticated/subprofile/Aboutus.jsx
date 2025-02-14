import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Fonts } from "../../../constants/Font";
import { Color } from "../../../constants/Color";

import AuthText from "../../../components/header/AuthText";
import TeamProfile from "../../../components/profile/TeamProfile";

export default function Aboutus() {
  return (
    <ScrollView overScrollMode="never" bounces={false} style={styles.root}>
      <View style={styles.container}>
        <AuthText>About Us</AuthText>
        <Text style={styles.description}>
          At RemindeRx, we are a passionate team of innovators, engineers, and
          healthcare enthusiasts dedicated to improving health management
          through technology. Our mission is to empower individuals, especially
          the elderly and those with disabilities, to live healthier and safer
          lives with the support of our smart medicine storage and fall
          detection system.
        </Text>

        <Text style={styles.description}>
          Our team brings together expertise in software development, hardware
          integration, and healthcare solutions, working collaboratively to
          create a user-friendly platform that bridges the gap between
          technology and personal care. With backgrounds in computer
          engineering, mobile app development, and medical device design, we are
          committed to developing accessible and reliable solutions that address
          everyday health challenges.
        </Text>

        <Text style={styles.description}>
          Driven by the vision of improving patient care and caregiver
          efficiency, we continuously push the boundaries of innovation to
          provide better support for medication management and fall detection.
          Our commitment to excellence and user satisfaction remains at the
          heart of everything we do.
        </Text>

        <View style={styles.teamContainer}>
          <TeamProfile
            src={require("../../../assets/profile/lim.png")}
            name={"rinaldo samudio lim jr."}
            title={"project manager "}
          />

          <TeamProfile
            src={require("../../../assets/profile/barotilla.png")}
            name={"jhon carlo barotilla"}
            title={"product design engineer"}
          />

          <TeamProfile
            src={require("../../../assets/profile/peligro.png")}
            name={"justin c. peligro"}
            title={"software engineer"}
          />

          <TeamProfile
            src={require("../../../assets/profile/sombe.png")}
            name={"christian nerio sombe."}
            title={"product design engineer"}
          />

          <TeamProfile
            src={require("../../../assets/profile/bolleser.png")}
            name={"aaron jan t. bolleser"}
            title={"embedded system engineer"}
          />

          <TeamProfile
            src={require("../../../assets/profile/petalcorin.png")}
            name={"mark petalcorin"}
            title={"research and development engineer"}
          />
        </View>
      </View>
    </ScrollView>
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

  teamContainer: {
    marginVertical: 20,
  },
});
