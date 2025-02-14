import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import AuthText from "../../components/header/AuthText";
import TextInputs from "../../components/Inputs/TextInputs";
import MainButton from "../../components/buttons/MainButton";
import LoadingModal from "../../components/loading/LoadingModal";

// icon
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// context
import { useUser } from "../../context/userContext";
import { useLocation } from "../../context/locationContext";

export default function UserInfo({ navigation }) {
  // context
  const { name, age, setName, setAge } = useUser();
  const { address } = useLocation();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [ageError, setAgeError] = useState(null);

  // Reset name and age state when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setName("");
      setAge("");
      setError(null);
      setNameError(null);
      setAgeError(null);
    }, [setName, setAge])
  );

  // handle next
  const handleNext = () => {
    if (!name) {
      setNameError("Name field cannot be empty");
      return;
    }

    if (!age) {
      setAgeError("Age field cannot be empty");
      return;
    }

    // Check if any field is empty
    if (!name.trim() || !age.trim() || !address.trim()) {
      setError("Please ensure that all fields are filled out.");
      return;
    }

    // Clear any existing error
    setError(null);

    // Set loading to true while processing
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      // After delay, navigate to the next screen
      navigation.navigate("SetPassword");

      // Reset loading state
      setIsLoading(false);
    }, 1000); // 1-second delay
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}
        <View style={styles.main_container}>
          <View>
            <View style={styles.textContainer}>
              <AuthText style={styles.authText}>Personal Information</AuthText>
              <Text style={styles.text}>
                Please provide your personal details to complete your profile.
                This information helps us personalize your experience.
              </Text>
            </View>

            <View style={styles.inputView}>
              <MaterialIcons name="person" size={24} color="#B3B3B3" />
              <View style={styles.input}>
                <TextInputs
                  style={styles.inputText}
                  placeholder={nameError || "Name"}
                  placeholderTextColor={nameError ? Color.redColor : "#fff"}
                  onChangeText={(text) => {
                    setName(text);
                    setError(null);
                  }}
                  value={name}
                />
              </View>
            </View>

            <View style={styles.inputView}>
              <Ionicons name="calendar-number" size={24} color="#B3B3B3" />
              <View style={styles.input}>
                <TextInputs
                  style={styles.inputText}
                  placeholder={ageError || "Age"}
                  placeholderTextColor={ageError ? Color.redColor : "#fff"}
                  value={age}
                  onChangeText={(number) => {
                    setAge(number);
                    setError(null);
                  }}
                  maxLength={3}
                  keyboardType={"numeric"}
                />
              </View>
            </View>

            <View style={[styles.inputView, styles.disable]}>
              <FontAwesome name="location-arrow" size={24} color="#B3B3B3" />
              <View style={styles.input}>
                <TextInputs
                  style={styles.inputText}
                  placeholder={"Address"}
                  value={address} // Use address from location context
                  editable={false}
                />
              </View>
            </View>

            {error ? (
              <Text style={[styles.errorText, styles.button_gap]}>{error}</Text>
            ) : null}
          </View>

          <View style={styles.lower_container}>
            <MainButton onPress={handleNext}>Next</MainButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 20,
  },

  main_container: {
    flex: 1,
    justifyContent: "space-between",
  },

  lower_container: {
    marginBottom: 50,
  },

  textContainer: {
    marginBottom: 10,
  },

  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 14,
    maxWidth: "screen",
  },

  authText: {
    textTransform: "none",
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 22,
  },

  input: {
    flex: 1,
  },

  subText: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    textAlign: "center",
    marginTop: 18,
  },

  inputText: {
    paddingVertical: 15,
  },

  button_gap: {
    marginBottom: 20,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginTop: 10,
  },

  disable: {
    opacity: 0.5,
  },
});
