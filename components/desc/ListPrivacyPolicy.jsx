// rendered in PrivacyPolicyScreen.jsx
import React from "react";
import { View, StyleSheet } from "react-native";

// components - header
import TextPolicy from "../header/TextPolicy";
import DescPolicy from "../header/DescPolicy";

// constants
import { PrivacyPolicy } from "../../constants/details/PolicyData";
import { Color } from "../../constants/Color";

export default function ListPrivacyPolicy() {
  return (
    <>
      {PrivacyPolicy.map((policy, key) => (
        <View style={styles.root} key={key}>
          <TextPolicy>{policy.title}</TextPolicy>
          <DescPolicy>{policy.description}</DescPolicy>
          {policy.sections &&
            policy.sections.map((section, index) => (
              <React.Fragment key={index}>
                {section.sectionTitle && (
                  <TextPolicy style={styles.title}>
                    {section.sectionTitle}
                  </TextPolicy>
                )}
                {section.content &&
                  section.content.map((content, contentIndex) => (
                    <DescPolicy key={contentIndex}>{content}</DescPolicy>
                  ))}
              </React.Fragment>
            ))}
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 28,
  },
  title: {
    fontSize: 13,
    color: Color.tagLine,
  },
});
