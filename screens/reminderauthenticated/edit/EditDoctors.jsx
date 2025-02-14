import {
  View,
  Text,
  StyleSheet,
  Image,
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

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

const connection =
  Platform.OS === "android" ? `${android_url}/doctor` : `${ios_url}/doctor`;

export default function EditDoctors({ navigation, route }) {
  // this data is from ListDoctor.jsx
  const id = route.params.doctorId;
  const initialName = route.params.name;
  const initialSpecialty = route.params.specialty;
  const initialEmail = route.params.email;
  const initialNumber = route.params.number;
  const initialAddress = route.params.address;

  // state to add a doctor
  const [name, setName] = useState(initialName);
  const [specialty, setSpecialty] = useState(initialSpecialty);
  const [email, setEmail] = useState(initialEmail);
  const [number, setNumber] = useState(initialNumber.toString());
  const [address, setAddress] = useState(initialAddress);

  // loading state
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  // error state
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [speError, setSpeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [addressError, setAddressError] = useState("");

  // edit fn
  const handleEditDoctor = async () => {
    setUpdateIsLoading(true);

    try {
      if (!name) {
        setNameError("Doctor name field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      if (!specialty) {
        setSpeError("Specialty field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      if (!email) {
        setEmailError("Email Address field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      // Check if the email format is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        Alert.alert(
          "Email Address",
          `Please enter a valid email address. You mean ${email}@gmail.com`
        );
        setUpdateIsLoading(false);
        return;
      }

      if (!number) {
        setNumberError("Phone number field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      // Check if the phone number contains 11 digits
      if (number.length < 11) {
        Alert.alert("Phone Number", "The phone number must contain 11 digits.");
        setUpdateIsLoading(false);
        return;
      }

      if (!address) {
        setAddressError("Hospital Address field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      // Check if inputs are empty
      if (!name || !specialty || !email || !number || !address) {
        setError("Please complete all fields. Thank you!");
        setUpdateIsLoading(false);
        return;
      }

      // Request to the backend
      await axios.patch(`${connection}/${id}`, {
        // These are the data I want to edit
        doctor_name: name,
        specialty,
        email,
        mobile_number: number,
        address,
      });

      // Delay navigation to show the spinner
      setTimeout(() => {
        // Show alert message
        Alert.alert(
          "Doctor's Updated",
          `Dr.${name} details were updated successfully.`
        );

        navigation.navigate("Doctor");
        setUpdateIsLoading(false);
      }, 1000);

      return; // Ensure we don't proceed to the `finally` block immediately
    } catch (error) {
      // If there's an error
      setError(`Failed to update Dr.${name} details. Please try again later.`);
    } finally {
      // Delay resetting the loading state in case of errors
      setTimeout(() => {
        setUpdateIsLoading(false);
      }, 1000);
    }
  };

  // delete fn
  const handleDeleteDoctor = async () => {
    // Show confirmation dialog
    Alert.alert(
      `Delete Dr.${name}`,
      "Are you sure you want to delete this doctor details? This action cannot be undone.",
      [
        {
          // Cancel
          text: "Cancel",
          style: "cancel",
        },
        {
          // Yes
          text: "Yes",
          onPress: async () => {
            setDeleteIsLoading(true);

            try {
              // Request to the backend
              await axios.delete(`${connection}/${id}`);

              // Delay navigation to show the spinner
              setTimeout(() => {
                // Show an alert message after deleting
                Alert.alert(
                  "Doctor's Deleted",
                  `Dr.${name} details were deleted successfully`
                );

                navigation.navigate("Doctor");
                setDeleteIsLoading(false);
              }, 1000);

              return; // Ensure we don't proceed to the `finally` block immediately
            } catch (error) {
              // If there's an error
              setError(
                `Failed to delete the Dr.${name} details. Please try again later.`
              );
            } finally {
              // Delay resetting the loading state in case of errors
              setTimeout(() => {
                setDeleteIsLoading(false);
              }, 1000);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.root}>
          {updateIsLoading && <LoadingModal visible={updateIsLoading} />}
          {deleteIsLoading && <LoadingModal visible={deleteIsLoading} />}

          <View style={styles.doctorView}>
            <View>
              <Image
                style={styles.img}
                source={require("../../../assets/others/doctor_icon.png")}
              />
            </View>

            <View style={styles.dataView}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.specialty}>{specialty}</Text>
            </View>
          </View>
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

          <View style={styles.button_container}>
            <MainButton
              onPress={handleEditDoctor}
              style={
                updateIsLoading
                  ? styles.loading_state_update
                  : styles.updateButton
              }
            >
              {updateIsLoading ? "Updating Doctor..." : "Update Doctor"}
            </MainButton>
            <MainButton
              onPress={handleDeleteDoctor}
              style={
                deleteIsLoading ? styles.loading_state : styles.deleteButton
              }
            >
              {deleteIsLoading ? "Deleting Doctor..." : "Delete Doctor"}
            </MainButton>
          </View>
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

  button_container: {
    marginTop: 20,
  },

  deleteButton: {
    backgroundColor: Color.redColor,
  },

  updateButton: {
    backgroundColor: Color.greenColor,
    marginBottom: 10,
  },

  loading_state_update: {
    opacity: 0.5,
    backgroundColor: Color.greenColor,
    marginBottom: 10,
  },

  loading_state: {
    opacity: 0.5,
    backgroundColor: Color.redColor,
  },

  doctorView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 30,
  },

  dataView: {
    marginLeft: 10,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
  },

  name: {
    fontFamily: Fonts.main,
    color: "#fff",
    textTransform: "capitalize",
  },

  specialty: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    textTransform: "capitalize",
  },
});
