import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import InputText from "../../../components/header/InputText";
import TextInputs from "../../../components/Inputs/TextInputs";
import MainButton from "../../../components/buttons/MainButton";
import LoadingModal from "../../../components/loading/LoadingModal";

// firebase
import { auth } from "../../../firebase/firebase";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

const connection =
  Platform.OS === "android"
    ? `${android_url}/doctor/createdoctor`
    : `${ios_url}/doctor/createdoctor`;

export default function AddDoctor({ navigation }) {
  // state to add a doctor
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const [isLoading, setIsLoading] = useState(false); // loading state

  // error state
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [speError, setSpeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [addressError, setAddressError] = useState("");

  // fn to add doctor
  const handleAddDoctor = async () => {
    setIsLoading(true);

    try {
      // Get the current user
      const currentUser = auth.currentUser;

      // If there's a current user
      if (currentUser) {
        if (!name) {
          setNameError("Doctor name field cannot be empty");
          setIsLoading(false);
          return;
        }

        if (!specialty) {
          setSpeError("Specialty field cannot be empty");
          setIsLoading(false);
          return;
        }

        if (!email) {
          setEmailError("Email Address field cannot be empty");
          setIsLoading(false);
          return;
        }

        // Check if the email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          Alert.alert(
            "Email Address",
            `Please enter a valid email address. You mean ${email}@gmail.com`
          );
          setIsLoading(false);
          return;
        }

        if (!number) {
          setNumberError("Phone number field cannot be empty");
          setIsLoading(false);
          return;
        }

        // Check if the phone number contains 11 digits
        if (number.length < 11) {
          Alert.alert(
            "Phone Number",
            "The phone number must contain 11 digits."
          );
          setIsLoading(false);
          return;
        }

        if (!address) {
          setAddressError("Hospital Address field cannot be empty");
          setIsLoading(false);
          return;
        }

        // Check if inputs are empty
        if (!name || !specialty || !email || !number || !address) {
          setError("Please complete all fields. Thank you!");
          setIsLoading(false);
          return;
        }

        // Get the token
        const token = await currentUser.getIdToken();

        // Create an object to send to the database
        const doctorData = {
          doctor_name: name,
          specialty,
          email,
          mobile_number: number,
          address,
        };

        // Request to the backend together with the object we created
        const response = await axios.post(connection, doctorData, {
          headers: {
            // Send the token to backend for verification
            Authorization: `Bearer ${token}`,
          },
        });

        // If successfully created
        if (response.status === 201) {
          // Delay navigation to show the spinner
          setTimeout(() => {
            Alert.alert("Doctor Created", "New Doctor created successfully");

            // Clear the input fields
            setName("");
            setSpecialty("");
            setEmail("");
            setNumber("");
            setAddress("");

            navigation.navigate("Doctor");
            setIsLoading(false);
          }, 1000);

          return; // Ensure we don't proceed to the `finally` block immediately
        }
      }
    } catch (error) {
      setError(
        "An unexpected error occurred while creating the doctor list. Please try again later."
      );
    } finally {
      // Delay resetting the loading state in case of errors
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.root}>
          {isLoading && <LoadingModal visible={isLoading} />}

          <View style={styles.inputContainer}>
            <InputText style={styles.input}>Doctor name</InputText>
            <TextInputs
              style={styles.inputText}
              placeholder={nameError || "e.g., Juan Dela Cruz"}
              placeholderTextColor={nameError ? Color.redColor : "#fff"}
              value={name}
              onChangeText={setName}
            />

            <InputText style={styles.input}>Specialty</InputText>
            <TextInputs
              style={styles.inputText}
              placeholder={speError || "e.g., neurologist "}
              placeholderTextColor={speError ? Color.redColor : "#fff"}
              value={specialty}
              onChangeText={setSpecialty}
            />

            <InputText style={styles.input}>Email Address</InputText>
            <TextInputs
              style={styles.inputText}
              placeholder={emailError || "e.g., juandelacruz@gmail.com"}
              placeholderTextColor={emailError ? Color.redColor : "#fff"}
              value={email}
              onChangeText={setEmail}
              keyboardType={"email-address"}
            />

            <InputText style={styles.input}>Phone number</InputText>
            <TextInputs
              style={styles.inputText}
              placeholder={numberError || "e.g., 0912-345-6789"}
              placeholderTextColor={numberError ? Color.redColor : "#fff"}
              value={number}
              onChangeText={setNumber}
              keyboardType={"numeric"}
              maxLength={11}
            />

            <InputText style={styles.input}>Hospital address</InputText>
            <TextInputs
              style={styles.inputText}
              placeholder={addressError || "e.g., Mandaluyong City "}
              placeholderTextColor={addressError ? Color.redColor : "#fff"}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <MainButton
            style={isLoading && styles.loading_state}
            onPress={handleAddDoctor}
          >
            {isLoading ? "Loading..." : "Save"}
          </MainButton>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  inputContainer: {
    marginTop: 50,
  },

  inputText: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    color: "#fff",
  },

  input: {
    color: Color.tagLine,
    marginBottom: 10,
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
