import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import AuthText from "../../components/header/AuthText";
import TextInputs from "../../components/Inputs/TextInputs";
import MainButton from "../../components/buttons/MainButton";

// icons
import Fontisto from "@expo/vector-icons/Fontisto";
import Button from "../../components/buttons/Button";

// firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function ForgotPassword({ navigation }) {
  // state for changing password
  const [email, setEmail] = useState("");

  // loading state for handlePasswordReset
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(""); // error handling

  // password reset fn
  const handlePasswordReset = async () => {
    setIsLoading(true);

    if (!email) {
      setError("Please ensure that the email field is filled out.");
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate("ResetPassword", { email });
    } catch (error) {
      // Check the error code and set appropriate messages
      switch (error.code) {
        case "auth/user-not-found":
          setError("No user found with this email address.");
          break;
        case "auth/invalid-email":
          setError("The email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          setError("Password reset is not allowed. Please contact support.");
          break;
        case "auth/user-disabled":
          setError("This user account has been disabled.");
          break;
        default:
          setError("An error occurred. Please try again later.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <AuthText>password reset</AuthText>
        <Text style={styles.text}>
          We will send an email to help you reset your password.
        </Text>

        <View style={styles.inputView}>
          <Fontisto name="email" size={20} color="#B3B3B3" />
          <View style={styles.input}>
            <TextInputs
              keyboardType={"email-address"}
              placeholder={"Email Address"}
              value={email}
              onChangeText={setEmail}
              style={styles.inputText}
            />
          </View>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <KeyboardAvoidingView style={styles.keyboard}>
          <View style={styles.viewKey}>
            {!isLoading ? (
              <MainButton onPress={handlePasswordReset}>Send</MainButton>
            ) : (
              <Button isEnable={false}>
                <ActivityIndicator color={"#fff"} />
              </Button>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 5,
  },

  keyboard: {
    flex: 2,
    justifyContent: "flex-end",
  },

  viewKey: {
    marginBottom: 50,
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.container,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 17,
  },
  input: {
    flex: 1,
  },

  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    marginTop: 14,
    marginBottom: 17,
    maxWidth: 320,
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginVertical: 10,
  },

  inputText: {
    paddingVertical: 15,
  },
});
