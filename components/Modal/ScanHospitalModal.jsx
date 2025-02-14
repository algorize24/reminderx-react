import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Pressable,
  Text,
  Linking,
  ScrollView, // Import Linking
} from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// icons
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ScanHospitalModal({
  visible,
  setModalVisible,
  hospitals,
}) {
  // Function to open Google Maps and search for a hospital
  const openHospitalInGoogleMaps = (hospital) => {
    const { name, latitude, longitude } = hospital;

    // If both latitude and longitude are available, open Google Maps with coordinates
    if (latitude && longitude) {
      // Use the geo scheme for opening coordinates in Google Maps
      const mapUrl = `google.navigation:q=${latitude},${longitude}`;

      // Attempt to open the URL in Google Maps
      Linking.openURL(mapUrl).catch((err) => {
        console.error("Failed to open Google Maps with coordinates:", err);
        alert("Failed to open Google Maps.");
      });
    } else if (name) {
      // If no coordinates, search by hospital name
      const mapUrl = `https://www.google.com/maps/search/?q=${encodeURIComponent(
        name
      )}`;

      // Attempt to open the URL in a browser or Google Maps
      Linking.openURL(mapUrl).catch((err) => {
        console.error("Failed to open Google Maps with name:", err);
        alert("Failed to open Google Maps.");
      });
    } else {
      alert("No valid location or name for this hospital.");
    }
  };
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={styles.modal_close}
        >
          <AntDesign name="close" size={30} color="#fff" />
        </Pressable>
        <View style={styles.main_container}>
          <Text style={styles.modal_title}>Nearby Emergency Hospitals</Text>
          <ScrollView>
            {hospitals.length > 0 ? (
              hospitals.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => openHospitalInGoogleMaps(item)} // Open hospital in Google Maps
                  style={({ pressed }) => [
                    styles.hospital_item,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.hospital_name}>{item.name}</Text>
                </Pressable>
              ))
            ) : (
              <Text style={styles.no_data}>No hospitals found nearby.</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 50,
  },

  main_container: {
    backgroundColor: Color.bgColor,
    borderRadius: 5,
    width: "screen",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  modal_title: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 10,
  },

  hospital_item: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: Color.container,
    borderRadius: 5,
  },

  hospital_name: {
    color: Color.purpleColor,
    fontFamily: Fonts.main,
  },

  no_data: {
    fontFamily: Fonts.main,
    color: Color.redColor,
    textAlign: "center",
  },

  pressed: {
    opacity: 0.5,
  },

  modal_close: {
    justifyContent: "flex-start",
    marginVertical: 10,
  },
});
