import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// components
import AuthText from "../../../../components/header/AuthText";
import TextInputs from "../../../../components/Inputs/TextInputs";
import MainButton from "../../../../components/buttons/MainButton";
import LoadingModal from "../../../../components/loading/LoadingModal";

// context
import { useReminder } from "../../../../context/reminderContext";

export default function AddPillsWeek({ navigation, route }) {
  // reminder context
  const { medicationName, updateDosages } = useReminder();

  const { specificDay, selectedTime } = route.params; // Get specific day and time

  // Default pill count
  const [pillCount, setPillCount] = useState("1");

  // error state
  const [error, setError] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // function to add pills
  const handleAddPills = () => {
    // check if empty
    if (!pillCount) {
      setError("Complete your selection by adding the necessary pill(s).");
      return; // Stop execution if inputs are empty
    }

    setIsLoading(true);

    const reminderData = {
      day: specificDay,
      time: selectedTime, // Pass the time from `route.params`
      dosage: Number(pillCount), // Ensure dosage is a number
    };

    updateDosages((prevDosages) => {
      if (Array.isArray(prevDosages)) {
        return [...prevDosages, reminderData];
      }
      return [reminderData];
    });
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("AddCompartmentWeek");
    }, 1000);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text style={styles.title}>{medicationName}</Text>,
    });
  }, [navigation, medicationName]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}
        <AuthText style={styles.text}>
          How many pill(s) do you take on {specificDay} at{" "}
          {new Date(selectedTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // This ensures 12-hour format with AM/PM
          })}
          ?
        </AuthText>

        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>

          <View style={styles.inputView}>
            <TextInputs
              style={styles.input}
              maxLength={2}
              keyboardType={"numeric"}
              value={pillCount}
              onChangeText={(value) => setPillCount(value)}
            />
            <Text style={styles.pills}>Pill(s)</Text>
          </View>

          <View style={styles.button_container}>
            <MainButton style={styles.button} onPress={handleAddPills}>
              Next
            </MainButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
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
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  subContainer: {
    marginTop: 50,
    marginHorizontal: 30,
  },

  note: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  inputView: {
    margin: "auto",
    width: "50%",
    marginVertical: 30,
  },

  input: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    color: "#fff",
    width: "screen",
    textAlign: "center",
    marginVertical: 10,
    paddingVertical: 15,
  },

  time: {
    textAlign: "center",
    fontFamily: Fonts.main,
    fontSize: 15,
    color: "#fff",
  },

  pills: {
    textAlign: "center",
    fontFamily: Fonts.main,
    fontSize: 15,
    color: Color.tagLine,
  },

  error: {
    fontFamily: Fonts.main,
    color: Color.redColor,
    marginHorizontal: 18,
    marginTop: 40,
  },

  button_container: {
    marginBottom: 50,
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
