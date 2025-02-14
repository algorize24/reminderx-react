import {
  View,
  StyleSheet,
  Alert,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import InputText from "../../../components/header/InputText";
import TextInputs from "../../../components/Inputs/TextInputs";
import TextScreen from "../../../components/header/TextScreen";
import MainButton from "../../../components/buttons/MainButton";
import LoadingModal from "../../../components/loading/LoadingModal";

// axios
import axios from "axios";

// firebase
import { auth } from "../../../firebase/firebase";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

// host connection
const connection =
  Platform.OS === "android"
    ? `${android_url}/contact/createcontact`
    : `${ios_url}/contact/createcontact`;

export default function AddContact({ navigation }) {
  // state to add a contact
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // loading state for main button
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // function to create a contact
  const handleAddContact = async () => {
    // Set the loading to true
    setIsLoading(true);

    try {
      // Get the current user
      const currentUser = auth.currentUser;

      // If currentUser
      if (currentUser) {
        // Validate other fields
        if (!name) {
          setNameError("Name field cannot be empty");
          setIsLoading(false); // Stop loading if validation fails
          return; // Prevent further execution
        }

        if (!phoneNumber) {
          setPhoneError("Phone number field cannot be empty");
          setIsLoading(false); // Stop loading if validation fails
          return; // Prevent further execution
        }

        // Check if the phone number contains 11 digits
        if (phoneNumber.length < 11) {
          Alert.alert(
            "Phone Number",
            "The phone number must contain 11 digits."
          );
          setIsLoading(false);
          return;
        }

        // Check if inputs are empty
        if (!name || !phoneNumber) {
          setError("Please ensure that all fields are completed.");
          setIsLoading(false);
          return;
        }

        // Get the token to pass in the backend
        const token = await currentUser.getIdToken();

        // contactData structure to send to the backend
        const contactData = {
          name,
          phone_number: phoneNumber,
        };

        // Post request to this API
        const response = await axios.post(connection, contactData, {
          headers: {
            Authorization: `Bearer ${token}`, // Header authorization to create a contact
          },
        });

        // Handle successful response
        if (response.status === 201) {
          Alert.alert("Contact Created", "New contact created successfully!");

          // Reset the form
          setName("");
          setPhoneNumber("");

          // Delay navigation to show the spinner
          setTimeout(() => {
            navigation.navigate("Contact");
            setIsLoading(false);
          }, 2000);

          return;
        }
      }
    } catch (error) {
      setError(
        "An unexpected error occurred while creating a contact. Please try again later."
      );
    } finally {
      // delay resetting the loading state in case of errors
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}

        <TextScreen style={styles.text_style}>Add Contact</TextScreen>

        <InputText style={styles.input}>Name</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder={nameError || "e.g., Juan Dela Cruz"}
          placeholderTextColor={nameError ? Color.redColor : "#fff"}
          value={name}
          onChangeText={setName}
        />
        <InputText style={styles.input}>Phone number</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder={phoneError || "e.g., 0912-345-6789"}
          placeholderTextColor={phoneError ? Color.redColor : "#fff"}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="number-pad"
          maxLength={11}
        />

        <MainButton
          style={isLoading && styles.loading_state}
          onPress={handleAddContact}
        >
          {isLoading ? "Loading..." : "Save"}
        </MainButton>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  text_style: {
    textAlign: "left",
    marginTop: 50,
    marginBottom: 30,
  },

  inputContainer: {
    marginTop: 49,
  },

  input: {
    color: Color.tagLine,
    marginBottom: 10,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
    color: "#fff",
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginVertical: 10,
  },

  loading_state: {
    opacity: 0.5,
  },
});
