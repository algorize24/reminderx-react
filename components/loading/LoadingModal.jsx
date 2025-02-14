import React from "react";
import { View, Modal, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function LoadingModal({ visible }) {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 5,
    backgroundColor: Color.bgColor,
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 13,
    fontFamily: Fonts.main,
  },
});
