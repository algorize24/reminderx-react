import {
  View,
  StyleSheet,
  Text,
  Alert,
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
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import MainButton from "../../../components/buttons/MainButton";
import LoadingModal from "../../../components/loading/LoadingModal";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

const connection =
  Platform.OS === "android" ? `${android_url}/contact` : `${ios_url}/contact`;

export default function EditContact({ navigation, route }) {
  // this data is from ListContact.jsx
  const _id = route.params.contactId;
  const initialName = route.params.name;
  const initialPhoneNumber = route.params.number;

  // state to edit
  const [name, setName] = useState(initialName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber.toString());

  // loading state
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  // error state
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Handler to edit contact
  const handleEditingContact = async () => {
    setUpdateIsLoading(true);

    try {
      // Validate other fields
      if (!name) {
        setNameError("Name field cannot be empty");
        setUpdateIsLoading(false); // Stop loading if validation fails
        return; // Prevent further execution
      }

      if (!phoneNumber) {
        setPhoneError("Phone number field cannot be empty");
        setUpdateIsLoading(false); // Stop loading if validation fails
        return; // Prevent further execution
      }
      // Check if the phone number contains 11 digits
      if (phoneNumber.length < 11) {
        Alert.alert("Phone Number", "The phone number must contain 11 digits.");
        setUpdateIsLoading(false);
        return;
      }

      // Check if inputs are empty
      if (!name || !phoneNumber) {
        setError("Please complete all fields. Thank you!");
        setUpdateIsLoading(false);
        return;
      }

      // Send the updated data to the backend
      await axios.patch(`${connection}/${_id}`, {
        name,
        phone_number: phoneNumber,
      });

      // Delay navigation to show the spinner
      setTimeout(() => {
        // On success, show alert and navigate back to the contact list
        Alert.alert(
          "Contact Updated",
          "The contact details were updated successfully."
        );

        navigation.navigate("Contact");
        setUpdateIsLoading(false);
      }, 1000);

      return;
    } catch (error) {
      setError("Failed to update contact. Please try again later.");
    } finally {
      setTimeout(() => {
        setUpdateIsLoading(false);
      }, 1000);
    }
  };

  const handleDeletingContact = () => {
    // Show confirmation dialog
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            setDeleteIsLoading(true); // Set loading state to true when the button is pressed

            try {
              // Send DELETE request to the backend
              await axios.delete(`${connection}/${_id}`);

              setTimeout(() => {
                // On success, navigate back to the contact list
                Alert.alert(
                  "Contact deleted",
                  "The contact was deleted successfully."
                );
                navigation.navigate("Contact");
                setDeleteIsLoading(false);
              }, 1000);
            } catch (error) {
              setError("Failed to delete the contact. Please try again later");
            } finally {
              setTimeout(() => {
                setDeleteIsLoading(false); // Reset loading state
              }, 1000);
            }
          },
        },
      ],
      { cancelable: true } // allows the alert to be dismissed by tapping outside
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {updateIsLoading && <LoadingModal visible={updateIsLoading} />}
        {deleteIsLoading && <LoadingModal visible={deleteIsLoading} />}

        <View style={styles.textContainer}>
          <TextScreen style={styles.textScreen}>
            # <Text style={styles.name}>{name || ""}</Text>
          </TextScreen>
        </View>

        <InputText style={styles.input}>Name</InputText>
        <TextInputs
          style={styles.textInput}
          placeholder={nameError || "Name"}
          placeholderTextColor={nameError ? Color.redColor : "#fff"}
          value={name}
          onChangeText={setName}
        />

        <InputText style={styles.input}>Phone number</InputText>
        <TextInputs
          keyboardType="numeric"
          style={styles.textInput}
          placeholder={phoneError || "Phone Number"}
          placeholderTextColor={phoneError ? Color.redColor : "#fff"}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={11}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.button_container}>
          <MainButton
            onPress={handleEditingContact}
            style={
              updateIsLoading
                ? styles.loading_state_update
                : styles.updateButton
            }
          >
            {updateIsLoading ? "Updating Contact..." : "Update Contact"}
          </MainButton>
          <MainButton
            onPress={handleDeletingContact}
            style={deleteIsLoading ? styles.loading_state : styles.deleteButton}
          >
            {deleteIsLoading ? "Deleting Contact..." : "Delete Contact"}
          </MainButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  textContainer: {
    alignItems: "flex-start",
    marginTop: 50,
    marginBottom: 20,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 10,
    color: "#fff",
  },

  button_container: {
    marginTop: 20,
  },

  updateButton: {
    backgroundColor: Color.greenColor,
    marginBottom: 10,
  },

  deleteButton: {
    backgroundColor: Color.redColor,
  },

  loading_state: {
    opacity: 0.5,
    backgroundColor: Color.redColor,
  },

  loading_state_update: {
    opacity: 0.5,
    backgroundColor: Color.greenColor,
    marginBottom: 10,
  },

  name: {
    color: Color.greenColor,
    textTransform: "capitalize",
  },

  textScreen: {
    color: Color.tagLine,
    textTransform: "capitalize",
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginVertical: 10,
  },

  input: {
    color: Color.tagLine,
    marginBottom: 10,
  },
});
