import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import Button from "../../components/buttons/Button";
import AuthText from "../../components/header/AuthText";
import TextInputs from "../../components/Inputs/TextInputs";
import CustomCheckbox from "../../components/buttons/CustomCheckbox";

// icon
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";

// context
import { useUser } from "../../context/userContext";
import { useAuth } from "../../context/authContext";
import { useLocation } from "../../context/locationContext";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// endpoint
const connection =
  Platform.OS === "android"
    ? `${android_url}/user/signup`
    : `${ios_url}/user/signup`;

export default function SetPassword({ navigation }) {
  // useUser context
  const { email, password, setPassword, name, age } = useUser();

  // useLocation context
  const { address } = useLocation();

  // useAuth context
  const { signUp } = useAuth();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // show password icon...
  const [showPassword, setShowPassword] = useState(false);

  // state for checkbox
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Reset password state when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setPassword("");
      setError(null);
      setPasswordError(null);
    }, [setPassword])
  );

  // fn for show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // fn for checkbox
  const handleCheckedLaw = (isChecked) => {
    setIsButtonEnabled(isChecked);
  };

  // handleSignUp function
  const handleSignUp = async () => {
    setError(null);

    if (!email) {
      setError("We encountered an issue. The email address data is missing.");
      return;
    }

    if (!name) {
      setError("We encountered an issue. The name data is missing.");
      return;
    }

    if (!age) {
      setError("We encountered an issue. The age data is missing.");
      return;
    }

    if (!address) {
      setError("We encountered an issue. The address data is missing.");
      return;
    }

    if (!password) {
      setPasswordError("Password field cannot be empty");
      return;
    }

    setIsLoading(true);

    try {
      // sign up with firebase auth
      const firebaseUser = await signUp(email, password);

      // send user details to the backend
      await axios.post(connection, {
        firebaseUid: firebaseUser.user.uid,
        email,
        name,
        age,
        address,
      });

      // Navigate to 'CreatingAccount' first, even if the user is authenticated
      navigation.navigate("CreatingAccount", { emailSent: true });
    } catch (error) {
      console.log(error);
      // error message
      if (error.code === "auth/email-already-in-use") {
        setError(
          "This email address is already in use. Please use a different email."
        );
      } else if (error.code === "auth/weak-password") {
        setError(
          "Password is too weak. Please choose a stronger password (minimum 6 characters)."
        );
      } else if (error.response) {
        const serverError = error.response.data.errors
          ? error.response.data.errors.map((err) => err.msg).join("\n")
          : "Sign Up failed. Please check your details and try again.";
        setError(serverError);
      } else if (error.message) {
        setError("Network error, please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <View style={styles.main_container}>
          <View>
            <View style={styles.textContainer}>
              <AuthText style={styles.authText}>Set Password</AuthText>
              <Text style={styles.text}>
                Create a strong password to secure your account. Your password
                should be at least 6 characters long.
              </Text>
            </View>

            <View style={styles.inputView}>
              <Feather name="lock" size={20} color="#B3B3B3" />

              <View style={styles.input}>
                <TextInputs
                  style={styles.inputText}
                  placeholder={passwordError || "Password"}
                  placeholderTextColor={passwordError ? Color.redColor : "#fff"}
                  value={password}
                  secure={showPassword ? false : true}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError(null);
                  }}
                />
              </View>

              <Pressable onPress={handleShowPassword}>
                <Entypo
                  name={showPassword ? "eye" : "eye-with-line"}
                  size={20}
                  color="#B3B3B3"
                />
              </Pressable>
            </View>

            {error ? (
              <Text style={[styles.errorText, styles.button_gap]}>{error}</Text>
            ) : null}
          </View>

          <View style={styles.lower_container}>
            <CustomCheckbox onCheckedLawChange={handleCheckedLaw} />

            {!isLoading ? (
              <Button onPress={handleSignUp} isEnable={isButtonEnabled}>
                Sign Up
              </Button>
            ) : (
              <Button isEnable={false}>
                <View style={styles.loadingView}>
                  <Text style={styles.loadingText}>Signing Up</Text>
                  <ActivityIndicator size={"small"} color={"#fff"} />
                </View>
              </Button>
            )}
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

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginTop: 10,
  },

  loadingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginRight: 5,
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 16,
  },

  inputText: {
    paddingVertical: 15,
  },

  button_gap: {
    marginBottom: 20,
  },
});
