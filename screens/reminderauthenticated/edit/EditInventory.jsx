import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
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
import TextScreen from "../../../components/header/TextScreen";
import TextInputs from "../../../components/Inputs/TextInputs";
import MainButton from "../../../components/buttons/MainButton";
import LoadingModal from "../../../components/loading/LoadingModal";

// date & time picker expo
import DateTimePicker from "@react-native-community/datetimepicker";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

const connection =
  Platform.OS === "android"
    ? `${android_url}/inventory/`
    : `${ios_url}/inventory/`;

export default function EditInventory({ navigation, route }) {
  // this data is from ListInventory.jsx
  const _id = route.params.medicineId;
  const initialMedicineName = route.params.medicine;
  const initialDosage = route.params.dosage;
  const initialExpirationDate = route.params.expiration_date;
  const initialStock = route.params.stock;
  const initialCompartment = route.params.compartment;

  // state to edit
  const [medicineName, setMedicineName] = useState(initialMedicineName);
  const [dosage, setDosage] = useState(initialDosage.toString());
  const [expirationDate, setExpirationDate] = useState(
    initialExpirationDate ? new Date(initialExpirationDate) : null
  );
  const [stock, setStock] = useState(initialStock.toString());
  const [compartment, setCompartment] = useState(initialCompartment.toString());

  // loading state
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false); // showDatePicker state

  // error state
  const [medError, setMedError] = useState("");
  const [dosageError, setDosageError] = useState("");
  const [stockError, setStockError] = useState("");
  const [compError, setCompError] = useState("");
  const [error, setError] = useState("");

  // edit inventory fn
  const handleEditInventory = async () => {
    setUpdateIsLoading(true);

    try {
      if (!medicineName) {
        setMedError("Medicine name field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      if (!dosage) {
        setDosageError("Dosage field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      if (!stock) {
        setStockError("Stock field cannot be empty");
        setUpdateIsLoading(false);
        return;
      }

      if (!expirationDate) {
        Alert.alert(
          "Expiration Date",
          "Please ensure you select an expiration date."
        );
        setUpdateIsLoading(false);
        return;
      }

      if (!compartment) {
        setCompError("Compartment field cannot be empty");
        setUpdateIsLoading(false);
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
        setUpdateIsLoading(false);
        return;
      }

      // request to the backend
      await axios.patch(`${connection}${_id}`, {
        // these are the data i want to edit
        medicine_name: medicineName,
        dosage,
        expiration_date: expirationDate.toISOString(),
        stock,
        compartment,
      });

      setTimeout(() => {
        // show alert message
        Alert.alert(
          "Inventory Updated",
          `The ${medicineName} inventory details were updated successfully`
        );
        // after, go to..
        navigation.navigate("Inventory");
        setUpdateIsLoading(false);
      }, 1000);
    } catch (error) {
      // if there's an error
      setError(
        `Failed to update ${medicineName} inventory. Please try again later.`
      );
    } finally {
      setTimeout(() => {
        setUpdateIsLoading(false);
      }, 1000);
    }
  };

  // delete inventory fn
  const handleDeleteInventory = () => {
    // show confirmation dialog
    Alert.alert(
      `Delete ${medicineName}`,
      "Are you sure you want to delete this medicine? This action cannot be undone.",
      [
        {
          // cancel
          text: "Cancel",
          style: "cancel",
        },
        {
          // yes
          text: "Yes",
          onPress: async () => {
            setDeleteIsLoading(true);

            try {
              // request to the backend
              await axios.delete(`${connection}${_id}`);

              setTimeout(() => {
                // show an alert message after deleting
                Alert.alert(
                  "Inventory Deleted",
                  `The ${medicineName} inventory was deleted successfully`
                );

                // go to this screen
                navigation.navigate("Inventory");
                setDeleteIsLoading(false);
              }, 1000);
            } catch (error) {
              // if there's an error
              setError(
                `Failed to delete the ${medicineName} inventory. Please try again later.`
              );
            } finally {
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
          {updateIsLoading && <LoadingModal visible={updateIsLoading} />}
          {deleteIsLoading && <LoadingModal visible={deleteIsLoading} />}

          <View>
            <View style={styles.textContainer}>
              <TextScreen style={styles.textScreen}>
                # <Text style={styles.name}>{medicineName || ""}</Text>
              </TextScreen>
            </View>

            <InputText style={styles.input}>Medicine name</InputText>
            <TextInputs
              style={styles.textInput}
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
              <Text style={styles.textSelect}>Tap to Change the Date</Text>
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

          <View style={styles.button_container}>
            <MainButton
              onPress={handleEditInventory}
              style={
                updateIsLoading
                  ? styles.loading_state_update
                  : styles.updateButton
              }
            >
              {updateIsLoading ? "Updating Inventory..." : "Update Inventory"}
            </MainButton>

            <MainButton
              onPress={handleDeleteInventory}
              style={
                deleteIsLoading ? styles.loading_state : styles.deleteButton
              }
            >
              {deleteIsLoading ? "Deleting Inventory..." : "Delete Inventory"}
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

  textContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "flex-start",
  },

  textInput: {
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

  button_container: {
    marginTop: 20,
  },

  name: {
    color: Color.greenColor,
  },

  textScreen: {
    color: Color.tagLine,
  },

  selectedDate: {
    opacity: 0.7,
  },

  textSelect: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  selectExpirationDate: {
    padding: 10,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginVertical: 10,
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
});
