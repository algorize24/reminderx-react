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

export default function AddCompartmentEveryday({ navigation }) {
  // reminder context
  const { medicationName, compartment, setCompartment } = useReminder();

  // error state
  const [error, setError] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // handle compartment selection
  const handleCompartmentChange = (text) => {
    // Update the compartment state but don't navigate
    const number = parseInt(text, 10);

    // Allow valid numbers between 1 and 5 or empty input
    if ((number >= 1 && number <= 5) || text === "") {
      setCompartment(text); // Update state only if valid
    }
  };

  const handleSetReminder = () => {
    if (!compartment) {
      setError(
        "Compartment number is required. Please enter a number between 1 and 5."
      );
      return;
    }

    // Start loading before the delay
    setIsLoading(true);

    const number = parseInt(compartment, 10);

    // Only navigate when the compartment value is valid
    if (number >= 1 && number <= 5) {
      // Add a 1-second delay before navigating
      setTimeout(() => {
        setIsLoading(false); // Stop loading after the delay

        // Navigate after the delay
        navigation.navigate("SetReminder");
      }, 1000); // 1-second delay
    } else {
      setError("Please enter a valid compartment number between 1 and 5.");
      setIsLoading(false); // Stop loading if the compartment value is invalid
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}
        <AuthText style={styles.text}>
          Please type the compartment you would like to choose (1-5).
        </AuthText>

        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>

          <View style={styles.inputView}>
            <TextInputs
              style={styles.input}
              maxLength={2}
              keyboardType={"numeric"}
              value={compartment}
              onChangeText={handleCompartmentChange}
              placeholder={"e.g., 1"}
            />
            <Text style={styles.cid}>Compartment</Text>
          </View>
          <View style={styles.button_container}>
            <MainButton onPress={handleSetReminder} style={styles.button}>
              Set
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
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "space-between",
  },

  inputView: {
    margin: "auto",
    width: "50%",
    marginVertical: 30,
    alignItems: "center",
  },

  input: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    color: "#fff",
    width: 120,
    textAlign: "center",
    marginVertical: 10,
    paddingVertical: 15,
  },

  cid: {
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
    alignItems: "center",
    marginBottom: 50,
  },

  button: {
    width: "90%",
  },
});
