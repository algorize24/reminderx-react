import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
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
import Fontisto from "@expo/vector-icons/Fontisto";

// context
import { useUser } from "../../context/userContext";

export default function AuthSignUp({ navigation }) {
  // context
  const { email, setEmail } = useUser();

  // error state
  const [error, setError] = useState(null);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // Reset email state when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setEmail(""); // Reset the email state to empty
      setError(null); // Optional: Clear error state
    }, [setEmail])
  );

  // go to sign in screen
  const handleSignIn = () => {
    navigation.navigate("Signin");
  };

  // handle next
  const handleNext = () => {
    // Check if email input is empty
    if (!email.trim()) {
      setError("Email Address field cannot be empty");
      return;
    }

    // Validate email address format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Email Address",
        `The email address you entered is not valid (e.g., ${email}@gmail.com)`
      );
      return;
    }

    // Clear any existing error
    setError(null);

    // Set loading to true while processing
    setIsLoading(true);

    // Simulate processing delay
    setTimeout(() => {
      // After delay, navigate to the next screen
      navigation.navigate("UserInfo");

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
              <AuthText style={styles.authText}>Create an Account</AuthText>
              <Text style={styles.text}>
                We will send you an email to this address for verification.
              </Text>
            </View>

            <View style={styles.inputView}>
              <Fontisto name="email" size={20} color="#B3B3B3" />
              <View style={styles.input}>
                <TextInputs
                  style={styles.inputText}
                  keyboardType={"email-address"}
                  placeholder={error || "Email Address"}
                  placeholderTextColor={error ? Color.redColor : "#fff"}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(null); // Clear error on text input
                  }}
                  value={email}
                />
              </View>
            </View>
          </View>

          <View style={styles.lower_container}>
            <MainButton onPress={handleNext}>Next</MainButton>
            <Text style={styles.subText}>
              Already have an account?{" "}
              <Text onPress={handleSignIn} style={styles.signInText}>
                Sign In
              </Text>
            </Text>
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
    maxWidth: 320,
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
    fontSize: 15,
  },

  signInText: {
    color: Color.purpleColor,
    textDecorationLine: "underline",
  },

  inputText: {
    paddingVertical: 15,
  },
});
