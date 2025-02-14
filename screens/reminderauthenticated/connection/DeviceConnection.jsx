import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";

// component
import LoadingConnection from "../../../components/loading/LoadingConnection.jsx";
import ScanHospitalModal from "../../../components/Modal/ScanHospitalModal.jsx";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// generate report
import { generateReportPDF } from "../../../utils/generateReportPDF.js";

// expo
import * as MediaLibrary from "expo-media-library";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

// axios
import axios from "axios";

// expo location
import * as Location from "expo-location"; // Ensure this is correctly imported

// FAKE DATA
const data = {
  name: "siuzysaur",
  email: "siuzysaur@gmail.com",
  startDate: "December 01",
  endDate: "December 07, 2024",
  avgPulseRate: 72,
  avgOxygen: 96,
  totalTaken: 20,
  totalSkipped: 3,
  skippedDates: "December 02 - 1 pill(s), December 05 - 2 pill(s)",
  skippedSummaries: [
    "December 02: Missed Vitamin D dose.",
    "December 05: Missed Pain Reliever doses.",
  ],
};

export default function DeviceConnection() {
  // loading state
  const [reportLoading, setReportLoading] = useState(false);
  const [scanHospitalLoading, setScanHospitalLoading] = useState(false);

  // modal
  const [modalVisible, setModalVisible] = useState(false);

  // state for hospital list
  const [hospitals, setHospitals] = useState([]);

  // function to generate a report
  const generatePDF = async () => {
    setReportLoading(true); // Set loading state to true
    setTimeout(async () => {
      const htmlContent = generateReportPDF(data);

      try {
        // Request storage permission on Android using expo-media-library
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access storage is required!");
          setReportLoading(false); // Reset loading state
          return;
        }

        // Generate the PDF
        const { uri } = await Print.printToFileAsync({
          html: htmlContent,
          base64: false,
        });

        console.log("PDF generated at:", uri);

        // Define a target path
        const downloadsPath = `${FileSystem.documentDirectory}RemindeRx_HealthReport.pdf`;

        // Save the file to app's document directory
        await FileSystem.copyAsync({
          from: uri,
          to: downloadsPath,
        });

        console.log("PDF saved to app's directory:", downloadsPath);

        // Share the file using the Sharing API
        await Sharing.shareAsync(downloadsPath);

        Alert.alert(
          "Successfully Created",
          "Successfully generated a health and medication report, ready for sharing."
        );
      } catch (error) {
        console.error("Error generating or saving PDF:", error);
        Alert.alert(
          "Error Generating",
          "An unexpected error occurred while generating or saving the report."
        );
      } finally {
        setReportLoading(false); // Reset loading state
      }
    }, 2000); // 2-second delay
  };

  const scanNearestHospital = async () => {
    setScanHospitalLoading(true);

    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location access is required to scan hospitals."
        );
        setScanHospitalLoading(false);
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;

      console.log(latitude, longitude);

      // Define a bounding box to limit the search area
      const boundingBoxSize = 0.02; // Roughly 5km radius
      const minLat = latitude - boundingBoxSize;
      const maxLat = latitude + boundingBoxSize;
      const minLon = longitude - boundingBoxSize;
      const maxLon = longitude + boundingBoxSize;

      // Fetch nearby hospitals using OpenStreetMap's Nominatim API
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: "hospitals",
            format: "json",
            limit: 6,
            viewbox: `${minLon},${minLat},${maxLon},${maxLat}`, // Restrict results to this bounding box
            bounded: 1, // Ensure results are limited to the bounding box
          },
        }
      );

      console.log("Fetched Hospitals:", response.data);

      // Extract and map the results
      const fetchedHospitals = response.data.map((item) => ({
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
      }));

      setHospitals(fetchedHospitals);
      setModalVisible(true); // Show modal with hospital data
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to scan for hospitals. Please try again later."
      );
    } finally {
      setScanHospitalLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <ScanHospitalModal
        setModalVisible={setModalVisible}
        visible={modalVisible}
        hospitals={hospitals}
      />
      {reportLoading && (
        <LoadingConnection
          visible={reportLoading}
          title={"Generating Report"}
        />
      )}

      {scanHospitalLoading && (
        <LoadingConnection
          visible={scanHospitalLoading}
          title={"Scanning Nearest Hospital"}
        />
      )}
      <View style={styles.main_container}>
        <Pressable
          style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
          <Text style={styles.text}>Health Overview Sensor</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        >
          <Text style={styles.text}>Smart Medicine Storage</Text>
        </Pressable>

        <View style={styles.boundary}></View>

        <Pressable
          onPress={generatePDF}
          style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed,
            styles.report_gap,
          ]}
        >
          <Text style={styles.text}>Generate Report (7d)</Text>
        </Pressable>

        <View style={styles.boundary}></View>

        <Pressable
          onPress={scanNearestHospital}
          style={({ pressed }) => [
            styles.container,
            pressed && styles.pressed,
            styles.report_gap,
          ]}
        >
          <Text style={styles.text}>Scan the nearest hospital</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  main_container: {
    marginTop: 30,
  },

  pressed: {
    opacity: 0.7,
  },

  container: {
    backgroundColor: Color.container,
    width: "screen",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
    textAlign: "center",
  },

  boundary: {
    borderWidth: 1,
    marginVertical: 10,
    borderColor: "#fff",
    width: 60,
    marginHorizontal: "auto",
  },

  report_gap: {
    marginTop: 10,
  },
});
