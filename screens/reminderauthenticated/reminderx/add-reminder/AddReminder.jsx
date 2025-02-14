import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";

// components
import AuthText from "../../../../components/header/AuthText";
import TextInputs from "../../../../components/Inputs/TextInputs";
import MainButton from "../../../../components/buttons/MainButton";
import LoadingModal from "../../../../components/loading/LoadingModal";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// context
import { useReminder } from "../../../../context/reminderContext";

export default function AddReminder({ navigation }) {
  // reminderContext
  const { medicationName, setMedicationName } = useReminder();

  // state for inputs
  const [medName, setMedName] = useState(medicationName);

  // error state
  const [error, setError] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // fn for MainButton
  const handleMedicationName = () => {
    // reset the error
    setError("");

    // check if medName is not empty or whitespace
    if (medName.trim()) {
      setIsLoading(true);
      setMedicationName(medName);

      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate("OftenTake");

        // reset the field
        setMedName("");
      }, 1000);
    } else {
      setError("Medication name cannot be empty.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}
        <AuthText style={styles.text}>
          What medicine would you like to add?
        </AuthText>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.medText}>Type your medication name</Text>

            <TextInputs
              style={styles.inputs}
              placeholder={error || "e.g., Paracetamol"}
              placeholderTextColor={error ? Color.redColor : "#fff"} // Red color for error
              value={medName}
              onChangeText={(text) => setMedName(text)}
            />
          </View>
          <View style={styles.button_container}>
            <MainButton onPress={handleMedicationName} style={styles.button}>
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
    marginTop: 30,
    marginHorizontal: 20,
  },

  medText: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  inputs: {
    backgroundColor: Color.bgColor,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    color: "#fff",
  },

  button_container: {
    alignItems: "center",
    marginBottom: 50,
  },

  button: {
    width: "90%",
  },
});
