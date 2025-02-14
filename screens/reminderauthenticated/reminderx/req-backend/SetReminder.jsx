import { View, Text, StyleSheet, Image, Alert, Platform } from "react-native";
import { useLayoutEffect, useState } from "react";

// context
import { useReminder } from "../../../../context/reminderContext";

// constants
import { Fonts } from "../../../../constants/Font";
import { Color } from "../../../../constants/Color";

// components
import AuthText from "../../../../components/header/AuthText";
import MainButton from "../../../../components/buttons/MainButton";
import LoadingModal from "../../../../components/loading/LoadingModal";

// firebase
import { auth } from "../../../../firebase/firebase";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../../constants/Url";

const connection =
  Platform.OS === "android"
    ? `${android_url}/reminder/createreminder`
    : `${ios_url}/reminder/createreminder`;

export default function SetReminder({ navigation }) {
  // reminderContext
  const {
    medicationName,
    setMedicationName,
    dosages,
    setDosages,
    reminderTime,
    setReminderTime,
    frequency,
    setFrequency,
    specificDays,
    setSpecificDays,
    compartment,
    setCompartment,
  } = useReminder();

  const [isLoading, setIsLoading] = useState(false); // loading state

  // helper fn to clear fields
  const clearFields = () => {
    setMedicationName("");
    setDosages([]);
    setReminderTime([]);
    setFrequency("");
    setSpecificDays([]);
    setCompartment("");
  };

  const handleAddReminder = async () => {
    if (reminderTime.length === 0) {
      Alert.alert("Error", "Please set a reminder time.");
      return;
    }

    setIsLoading(true);

    // Add a 1-second delay before executing the rest of the function
    setTimeout(async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken();

          // Ensure dosage values are numbers and time is standardized
          const correctedDosages = dosages.map((dosage) => ({
            time: new Date(dosage.time).toISOString(),
            dosage: Number(dosage.dosage), // Convert string to number
          }));

          // Ensure specificDays is properly formatted
          const correctedSpecificDays = Array.isArray(specificDays)
            ? specificDays
            : [specificDays];

          // Use the `time` from the `dosage` array for `times`
          const reminderData = {
            medicineName: medicationName,
            frequency: frequency || "Once a day",
            specificDays: correctedSpecificDays, // Pass as an array
            dosage: correctedDosages,
            times: correctedDosages.map((d) => d.time), // Derive `times` from `dosage`
            compartment,
          };

          console.log("Reminder Data:", reminderData);

          const response = await axios.post(connection, reminderData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 201) {
            Alert.alert(
              "Reminder Created",
              "New reminder created successfully"
            );
            clearFields();
            navigation.navigate("EventSchedule");
          }
        }
      } catch (error) {
        Alert.alert("An unexpected error occurred. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading after the process
      }
    }, 1000); // 1-second delay
  };

  // avoid flickering the headerTitle
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  return (
    <View style={styles.root}>
      {isLoading && <LoadingModal visible={isLoading} />}
      <>
        <AuthText style={styles.text}>
          Your medication <Text style={styles.rx}>reminder</Text> is ready to
          go.
        </AuthText>

        <Image
          style={styles.img}
          source={require("../../../../assets/others/successful.png")}
        />
      </>

      <View style={styles.button_container}>
        <MainButton onPress={handleAddReminder} style={styles.button}>
          Save
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 14,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginTop: 60,
    fontSize: 20,
    width: 320,
  },

  img: {
    width: 380,
    height: 320,
  },

  rx: {
    color: Color.purpleColor,
  },

  button_container: {
    alignItems: "center",
    marginBottom: 50,
  },

  button: {
    width: "90%",
  },
});
