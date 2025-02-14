import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";

// components
import MainButton from "../../components/buttons/MainButton";
import AuthInputs from "../../components/Inputs/AuthInputs";
import Button from "../../components/buttons/Button";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// axios
import axios from "axios";

// async
import AsyncStorage from "@react-native-async-storage/async-storage";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

const connection =
  Platform.OS === "android"
    ? `${android_url}/user/signin`
    : `${ios_url}/user/signin`;

export default function AuthLogin({ navigation }) {
  // auth states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(""); // error handling
  const [isLoading, setIsLoading] = useState(false); // loading handling
  const [rememberMe, setRememberMe] = useState(false); // Checkbox state

  const { signIn } = useAuth(); // signIn function in useAuth context

  const handleSignUp = () => {
    // navigation.navigate("Signup");
    navigation.reset({
      index: 0,
      routes: [{ name: "Signup" }],
    });
  };

  // Load stored email and password if rememberMe was checked
  useEffect(() => {
    const loadCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");
      const storedRememberMe = await AsyncStorage.getItem("rememberMe");

      // Only set email and password if rememberMe was previously checked
      if (storedRememberMe === "true") {
        setEmail(storedEmail || "");
        setPassword(storedPassword || "");
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  // function to login
  const handleSignIn = async () => {
    setError(""); // reset the error message before trying to sign in

    // check if email and password is empty
    if (!email || !password) {
      setError(
        "Please enter your login details. The input fields cannot be empty."
      );
      return;
    }

    setIsLoading(true);

    try {
      // firebase sign-in
      await signIn(email, password);
      const currentUser = auth.currentUser;

      // check if currentUser
      if (currentUser) {
        const token = await currentUser.getIdToken(); // get the token

        // send request to backend
        const response = await axios.post(
          // "http://10.0.2.2:5000/api/user/signin",
          connection,
          { email, password, token }, // we need these three in backend, so we will pass it.
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.user) {
          // Store credentials if rememberMe is checked
          if (rememberMe) {
            await AsyncStorage.setItem("userEmail", email);
            await AsyncStorage.setItem("userPassword", password);
            await AsyncStorage.setItem("rememberMe", "true");
          } else {
            // Clear stored credentials if rememberMe is not checked
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("userPassword");
            await AsyncStorage.setItem("rememberMe", "false");
          }

          navigation.navigate("ReminderDrawerAuthenticated"); // Navigate to next screen
        } else {
          setError(
            response.data.message || "Error signing in. Please try again."
          );
        }
      } else {
        setError("User not found, please check your credentials.");
      }
    } catch (error) {
      // Firebase error handling with no alerts
      if (error.code) {
        switch (error.code) {
          case "auth/email-not-verified":
            setError(
              "Your email address is not verified. Please check your email for the verification link."
            );
            break;
          case "auth/invalid-credential":
            setError("No account found with this email. Please sign up.");
            break;
          case "auth/invalid-password":
            setError("Incorrect password. Please try again.");
            break;
          case "auth/invalid-email":
            setError("Invalid email format. Please check and try again.");
            break;
          case "auth/network-request-failed":
            setError(
              "Network error. Please check your connection and try again."
            );
            break;
          default:
            setError(
              "Sign in failed. An unexpected error occurred. Please try again later"
            );
            break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Reminde<Text style={styles.rx}>Rx</Text>
          </Text>
        </View>

        <AuthInputs
          setEmail={setEmail}
          setPassword={setPassword}
          error={error}
          rememberMe={rememberMe}
          setRememberMe={setRememberMe}
          email={email}
          password={password}
        />

        <KeyboardAvoidingView style={styles.keyboard}>
          <View style={styles.viewKey}>
            {!isLoading ? (
              <MainButton onPress={handleSignIn}>Log In</MainButton>
            ) : (
              <Button isEnable={false}>
                <View style={styles.loadingView}>
                  <Text style={styles.loadingText}> Logging in</Text>
                  <ActivityIndicator size={"small"} color={"#fff"} />
                </View>
              </Button>
            )}
            <Text style={styles.subText}>
              Don't have an account?{" "}
              <Text onPress={handleSignUp} style={styles.signUpText}>
                Sign Up
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 25,
    flex: 1,
  },
  keyboard: {
    flex: 2,
    justifyContent: "flex-end",
  },

  viewKey: {
    marginBottom: 50,
  },

  textContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 25,
  },

  text: {
    fontFamily: Fonts.main,
    color: "white",
    fontSize: 30,
  },

  rx: {
    color: Color.purpleColor,
  },

  subText: {
    fontFamily: Fonts.main,
    color: "white",
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
  },

  signUpText: {
    color: Color.purpleColor,
    textDecorationLine: "underline",
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
});
