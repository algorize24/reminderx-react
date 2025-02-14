import {
  View,
  StyleSheet,
  Alert,
  Pressable,
  Text,
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

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

// axios
import axios from "axios";

// firebase
import { auth } from "../../../firebase/firebase";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

const connection =
  Platform.OS === "android"
    ? `${android_url}/inventory/createinventory`
    : `${ios_url}/inventory/createinventory`;

export default function AddMedicine({ navigation }) {
  // states to add a inventory
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [stock, setStock] = useState("");
  const [compartment, setCompartment] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false); // showDatePicker state
  const [isLoading, setIsLoading] = useState(false); // loading state

  // error state
  const [medError, setMedError] = useState("");
  const [dosageError, setDosageError] = useState("");
  const [stockError, setStockError] = useState("");
  const [compError, setCompError] = useState("");
  const [error, setError] = useState("");

  // function to add medicine
  const handleAddMedicine = async () => {
    setIsLoading(true);

    try {
      // get the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        if (!medicineName) {
          setMedError("Medicine name field cannot be empty");
          setIsLoading(false);
          return;
        }

        if (!dosage) {
          setDosageError("Dosage field cannot be empty");
          setIsLoading(false);
          return;
        }

        if (!stock) {
          setStockError("Stock field cannot be empty");
          setIsLoading(false);
          return;
        }

        if (!expirationDate) {
          Alert.alert(
            "Expiration Date",
            "Please ensure you select an expiration date."
          );
          setIsLoading(false);
          return;
        }

        if (!compartment) {
          setCompError("Compartment field cannot be empty");
          setIsLoading(false);
          return;
        }

        // check if inputs are empty
        if (
          !medicineName ||
          !dosage ||
          !expirationDate ||
          !stock ||
          !compartment
        ) {
          setError("Please ensure that all fields are completed.");
          setIsLoading(false);
          return;
        }

        // create an object to send to database
        const inventoryData = {
          medicine_name: medicineName,
          dosage,
          expiration_date: expirationDate.toISOString(),
          stock,
          compartment,
        };

        // request to the backend together with object we created
        const response = await axios.post(
          // "http://10.0.2.2:5000/api/inventory/createinventory",
          connection,
          inventoryData,
          {
            headers: {
              // send the token to backend for verification
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // if successfully created
        if (response.status === 201) {
          setTimeout(() => {
            Alert.alert(
              "Inventory Created",
              "New inventory created successfully"
            );

            // clear the input fields
            setMedicineName("");
            setDosage("");
            setExpirationDate("");
            setStock("");
            setCompartment("");

            // after that, go to this screen.
            navigation.navigate("Inventory");
            setIsLoading(false);
          }, 1000);
        }
      }
    } catch (error) {
      setError("An unexpected error occurred while creating the inventory.");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  // show and update the date
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the picker once a date is selected
    if (selectedDate) {
      setExpirationDate(selectedDate); // Update the expiration date
    }
  };

  // limit the user to input up to 5
  const handleCompartment = (text) => {
    // Check if the input is a number
    const number = parseInt(text, 10);

    // Allow valid numbers between 1 and 5 or empty input
    if ((number >= 1 && number <= 5) || text === "") {
      setCompartment(text); // Update state only if valid
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.root}>
          {isLoading && <LoadingModal visible={isLoading} />}
          <View style={styles.container}>
            <InputText style={styles.input}>Medicine name</InputText>
            <TextInputs
              style={styles.textInput}
              autoCapitalize={"words"}
              placeholder={medError || "e.g., paracetamol"}
              placeholderTextColor={medError ? Color.redColor : "#fff"}
              value={medicineName}
              onChangeText={setMedicineName}
            />

            <InputText style={styles.input}>Dosage</InputText>

            <TextInputs
              inputMode={"numeric"}
              keyboardType={"numeric"}
              style={styles.textInput}
              placeholder={dosageError || "e.g., 100mg"}
              placeholderTextColor={dosageError ? Color.redColor : "#fff"}
              maxLength={3}
              value={dosage}
              onChangeText={setDosage}
            />

            <InputText style={styles.input}>Stock</InputText>
            <TextInputs
              inputMode={"numeric"}
              keyboardType={"numeric"}
              style={styles.textInput}
              placeholder={stockError || "e.g, 10 "}
              placeholderTextColor={stockError ? Color.redColor : "#fff"}
              maxLength={3}
              value={stock}
              onChangeText={setStock}
            />

            <InputText style={styles.input}>Expiration date</InputText>
            <Pressable
              style={[styles.textInput, styles.selectExpirationDate]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.textSelect}>
                Tap to select an expiration date
              </Text>
            </Pressable>
            {expirationDate && (
              <TextInputs
                style={[styles.selectedDate, styles.textInput]}
                editable={false}
                placeholder={`Selected Date: ${expirationDate.toDateString()}`}
                placeholderTextColor={Color.tagLine}
              />
            )}

            {showDatePicker && (
              <DateTimePicker
                value={expirationDate || new Date()} // Default to current date if none selected
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                themeVariant="dark"
                style={{
                  marginHorizontal: "auto",
                  marginBottom: 10,
                }}
              />
            )}

            <InputText style={styles.input}>
              Type the compartment you prefer (1-5)
            </InputText>
            <TextInputs
              inputMode={"numeric"}
              keyboardType={"numeric"}
              style={styles.textInput}
              placeholder={compError || "e.g., 1"}
              placeholderTextColor={compError ? Color.redColor : "#fff"}
              maxLength={1}
              value={compartment}
              onChangeText={handleCompartment}
            />
          </View>

          <MainButton
            style={isLoading && styles.loading_state}
            onPress={handleAddMedicine}
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

  container: {
    marginTop: 20,
  },

  textInput: {
    backgroundColor: Color.container,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
    color: "#fff",
    textTransform: "capitalize",
  },

  input: {
    color: Color.tagLine,
    marginBottom: 10,
  },

  selectExpirationDate: {
    padding: 10,
  },

  textSelect: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  selectedDate: {
    opacity: 0.7,
    marginTop: -10,
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
