import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

// components
import TextInputs from "./TextInputs";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// icons
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// asycn storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthInputs({
  setEmail,
  setPassword,
  error,
  rememberMe,
  setRememberMe,
  email,
  password,
}) {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false); // show pass

  // invoke in pressable forgot password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // go to ForgotPassword Screen
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  // Load stored email and password when the component mounts
  useEffect(() => {
    const loadCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem("userEmail");
      const storedPassword = await AsyncStorage.getItem("userPassword");
      const storedRememberMe = await AsyncStorage.getItem("rememberMe");

      if (storedEmail && storedRememberMe === "true") {
        setEmail(storedEmail);
        setPassword(storedPassword || ""); // load password if saved
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  // Toggle Remember Me and clear AsyncStorage if unchecked
  const handleRememberMeToggle = async () => {
    setRememberMe(!rememberMe);
    if (!rememberMe) {
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userPassword");
    }
  };

  return (
    <>
      <View style={styles.inputsContainer}>
        <View style={styles.inputView}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color={Color.tagLine}
          />
          <View style={styles.input}>
            <TextInputs
              keyboardType={"email-address"}
              placeholder={"Email Address"}
              onChangeText={setEmail}
              value={email}
            />
          </View>
        </View>

        <View style={styles.inputView}>
          <Feather name="lock" size={20} color="#B3B3B3" />
          <View style={styles.input}>
            <TextInputs
              style={styles.borderStyle}
              secure={showPassword ? false : true}
              placeholder={"Password"}
              onChangeText={setPassword}
              value={password}
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
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Pressable style={styles.press} onPress={handleRememberMeToggle}>
            <MaterialCommunityIcons
              name={
                rememberMe
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={24}
              color="white"
            />
          </Pressable>
          <Text style={styles.text}>Remember Me</Text>
        </View>

        <View>
          <Text onPress={handleForgotPassword} style={styles.forgotText}>
            Forgot Password?
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    backgroundColor: Color.container,
    borderRadius: 8,
    padding: 10,
  },

  inputView: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
  },

  borderStyle: {
    borderTopWidth: 1,
    borderTopColor: Color.textInput,
  },

  container: {
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  press: {
    marginRight: 5,
  },
  text: {
    color: "white",
    fontFamily: Fonts.main,
  },

  forgotText: {
    color: Color.purpleColor,
    fontFamily: Fonts.main,
    textDecorationLine: "underline",
  },

  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    marginVertical: 10,
  },
});
