import { View, Text, StyleSheet, Image } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListNotification({ itemData }) {
  // data from notification screen
  const { medicineName, dosage, compartment, time, status } = itemData;

  // Format the time for display
  const formattedTime = new Date(time).toLocaleString("en-US", {
    weekday: "long", // e.g., Monday
    month: "long", // e.g., January
    day: "numeric", // e.g., 1
    year: "numeric", // e.g., 2024
    hour: "2-digit", // e.g., 02
    minute: "2-digit", // e.g., 30
    hour12: true, // 12-hour format with AM/PM
  });
  // status text color
  const textColor =
    status === "taken"
      ? Color.greenColor // Green for "taken"
      : Color.purpleColor; // Purple for "skipped"

  // status message
  const message =
    status === "taken"
      ? `You took ${dosage} pill(s) of ${medicineName} from compartment ${compartment} at ${formattedTime}`
      : `You skipped ${dosage} pill(s) of ${medicineName} from compartment ${compartment} at ${formattedTime}`;

  return (
    <View style={styles.container}>
      <View style={styles.sub_container}>
        <Image
          style={styles.img}
          alt="pills"
          source={
            status === "taken"
              ? require("../../assets/others/pill_taken.png") // Image when taken
              : require("../../assets/others/pill_skipped.png") // Image when skipped
          }
        />

        <View style={styles.data_container}>
          <View style={styles.info_container}>
            <Text style={styles.medicine_name}>{medicineName}</Text>
            <Text style={[styles.status, { color: textColor }]}>{status}</Text>
          </View>

          <Text style={styles.description}>{message}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.container,
    paddingVertical: 15,
    alignItems: "flex-start",
    borderRadius: 10,
    marginTop: 10,
  },

  sub_container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 20,
  },

  info_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  data_container: {
    marginLeft: 10,
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },

  medicine_name: {
    fontFamily: Fonts.main,
    fontSize: 16,
    color: "#fff",
    textTransform: "capitalize",
  },

  description: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 12,
    width: 255,
    marginTop: 5,
  },

  status: {
    fontFamily: Fonts.main,
    textTransform: "uppercase",
    fontSize: 10,
  },
});
