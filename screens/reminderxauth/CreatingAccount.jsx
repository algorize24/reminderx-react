import {
  View,
  Image,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import { useState } from "react";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// components
import AuthText from "../../components/header/AuthText";
import MainButton from "../../components/buttons/MainButton";

// context
import { useUser } from "../../context/userContext";
export default function CreatingAccount({ navigation, route }) {
  // context
  const { email, setEmail, setPassword, setName, setAge } = useUser();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleButton = () => {
    setIsLoading(true); // Set loading to true
    // Clear input fields
    setEmail("");
    setName("");
    setAge("");
    setPassword("");

    setTimeout(() => {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "Signin" }],
      });
    }, 1000);
  };

  const { emailSent } = route.params;
  return (
    <SafeAreaView style={styles.root}>
      <AuthText style={styles.authText}>Creating an Account</AuthText>

      {emailSent && (
        <>
          <View style={styles.content}>
            <Image
              style={styles.img}
              source={require("../../assets/others/successful.png")}
            />
            <Text style={styles.text}>
              Email sent successfully to{" "}
              <Text style={styles.email}>{email}</Text>. Please check your email
              for verification.
            </Text>
          </View>

          <View style={styles.button_container}>
            <MainButton
              style={isLoading ? styles.loading_state : styles.button}
              onPress={handleButton}
            >
              {isLoading ? "Getting Started..." : "Get Started"}
            </MainButton>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    marginTop: 30,
  },

  authText: {
    textTransform: "none",
    marginLeft: Platform.OS === "android" ? 10 : 20,
    marginTop: Platform.OS === "android" ? 10 : 20,
  },

  text: {
    fontFamily: Fonts.main,
    color: Color.greenColor,
    textAlign: "center",
    marginBottom: 100,
    paddingHorizontal: 7,
  },

  button_container: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },

  content: {
    marginTop: 89,
    alignItems: "center",
  },

  img: {
    width: 340,
    height: 320,
  },

  email: {
    color: "#fff",
  },

  loading_state: {
    width: "90%",
    opacity: 0.5,
  },
});
