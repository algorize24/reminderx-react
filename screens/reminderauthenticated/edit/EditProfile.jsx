import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";

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

// context
import { useAuth } from "../../../context/authContext";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

const connection =
  Platform.OS === "android" ? `${android_url}/user` : `${ios_url}/user`;

export default function EditProfile({ navigation }) {
  // context
  const { user } = useAuth();

  // user state
  const [userInfo, setUserInfo] = useState(null);

  // editing state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  // error state
  const [error, setError] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(null);

  // fetch the user from mongo database
  useEffect(() => {
    const fetchUser = async () => {
      // identify who user is logged in.
      if (user) {
        try {
          const response = await axios.get(`${connection}/${user.email}`);
          setUserInfo(response.data);
        } catch (error) {
          if (!error.response) {
            setError(
              "Unable to connect. Please check your internet connection and try again."
            );
          } else if (
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            // Client-side error (e.g., 404 or 401)
            setError(
              `Error ${error.response.status}: ${
                error.response.data.message ||
                "An unexpected error occurred. Please try again later."
              }`
            );
          } else if (error.response.status >= 500) {
            // Server-side error (e.g., 500 or 503)
            setError(
              `Error ${error.response.status}: ${
                error.response.data.message ||
                "An unexpected error occurred on the server. Please try again later."
              }`
            );
          } else {
            setError("An unexpected error occurred. Please try again later.");
          }
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  // edit the name, age
  const handleEditProfile = async () => {
    setIsLoading(true);

    // Only include fields that have values to avoid overwriting
    const updatedData = {};
    if (name) updatedData.name = name;
    if (age) updatedData.age = age;

    try {
      // Send the updated data to the backend
      await axios.patch(`${connection}/${userInfo._id}`, updatedData);

      // Introduce a delay of 1 second
      setTimeout(() => {
        // On success, navigate back to the profile screen
        navigation.navigate("Profile");
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError("Error updating your profile. Please try again later.");

      // Reset loading state after delay
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {isLoading && <LoadingModal visible={isLoading} />}

        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <InputText style={styles.input}>Email Address</InputText>
            <TextInputs
              style={[styles.inputs, styles.email]}
              value={userInfo ? userInfo.email : "Email Address"}
              editable={false}
            />

            <InputText style={styles.input}>Name</InputText>
            <TextInputs
              style={styles.inputs}
              placeholder={userInfo ? userInfo.name : "Name"}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={"#fff"}
            />

            <InputText style={styles.input}>Age</InputText>
            <TextInputs
              style={styles.inputs}
              placeholder={userInfo ? String(userInfo.age) : "Age"}
              value={age}
              onChangeText={(text) => setAge(text)}
              placeholderTextColor={"#fff"}
            />
            <InputText style={styles.input}>Address</InputText>

            <TextInputs
              style={[styles.inputs, styles.email]}
              value={userInfo ? userInfo.address : "Address"}
              placeholderTextColor={"#fff"}
              editable={false}
            />
          </View>
        </View>

        <MainButton
          style={isLoading ? styles.loading_state : styles.updateButton}
          onPress={handleEditProfile}
        >
          {isLoading ? "Updating Profile..." : "Update Profile"}
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

  container: {
    marginTop: 30,
  },

  inputContainer: {
    marginTop: 20,
    marginBottom: 15,
  },

  inputs: {
    backgroundColor: Color.container,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
    color: "#fff",
  },

  input: {
    color: Color.tagLine,
    marginBottom: 10,
  },

  email: {
    opacity: 0.5,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginVertical: 10,
  },

  updateButton: {
    backgroundColor: Color.greenColor,
  },

  loading_state: {
    backgroundColor: Color.greenColor,
    opacity: 0.5,
  },
});
