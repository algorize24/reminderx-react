import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Platform,
  Linking,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";

import { useFocusEffect } from "@react-navigation/native";

// constant
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// components
import LoadingRoots from "../../components/loading/LoadingRoots";
import LoadingProfile from "../../components/loading/LoadingProfile";

// auth context
import { useAuth } from "../../context/authContext";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// connection path
const connection =
  Platform.OS === "android" ? `${android_url}/user` : `${ios_url}/user`;

export default function ProfileScreen({ navigation }) {
  // state for fetching user
  const { user, logOut } = useAuth();

  // state for user info
  const [userInfo, setUserInfo] = useState(null);

  // main loading state
  const [isLoading, setIsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(null);

  // fetch the user from database
  const fetchUser = () => {
    if (user) {
      axios
        .get(`${connection}/${user.email}`)
        .then((response) => {
          setUserInfo(response.data);
          setUserLoading(false);
        })
        .catch((error) => {
          if (!error.response) {
            Alert.alert(
              "Network Error",
              "Unable to connect. Please check your internet connection and try again."
            );
          } else if (
            error.response.status >= 400 &&
            error.response.status < 500
          ) {
            // Client-side error (e.g., 404 or 401)
            Alert.alert(
              "Client Error",
              `Error ${error.response.status}: ${
                error.response.data.message || "An unexpected error occurred."
              }`
            );
          } else if (error.response.status >= 500) {
            // Server-side error (e.g., 500 or 503)
            Alert.alert(
              "Server Error",
              `Error ${error.response.status}: ${
                error.response.data.message ||
                "An unexpected error occurred on the server."
              }`
            );
          } else {
            Alert.alert(
              "Error",
              "An unexpected error occurred. Please try again later."
            );
          }
          setUserLoading(false);
        });
    } else {
      setUserLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      setUserLoading(true);
      fetchUser();
    }, [user])
  );

  // get the email and password and set a fall back
  const displayEmail = userInfo
    ? userInfo.email
    : "An unexpected error occured. Please try again later.";
  const address = userInfo
    ? userInfo.address
    : "An unexpected error occured. Please try again later.";

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await logOut(); // Call the logOut function from context

      navigation.navigate("AuthSelect");
    } catch (error) {
      Alert.alert(
        "Sign Out Failed",
        "We encountered an issue while trying to sign you out. Please try again later. If the problem persists, contact support for assistance."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Manage drawer behavior when loading
  useEffect(() => {
    if (isLoading) {
      navigation.setOptions({
        gestureEnabled: false,
        swipeEnabled: false,
      });
      navigation.closeDrawer();
    } else {
      navigation.setOptions({
        gestureEnabled: true,
        swipeEnabled: true,
      });
    }
  }, [isLoading, navigation]);

  let content = (
    <View style={styles.root}>
      <ScrollView
        overScrollMode="never"
        bounces={false}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }}
      >
        {userLoading ? (
          <LoadingProfile />
        ) : (
          <View style={styles.userInfo}>
            {userInfo && (
              <Image
                style={styles.img}
                source={require("../../assets/others/profile.png")}
              />
            )}
            <Text style={styles.email}>{displayEmail}</Text>
            <Text style={styles.address}>{address}</Text>
          </View>
        )}

        <View style={styles.links}>
          <Text
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.text}
          >
            Edit Profile
          </Text>

          <Text
            onPress={() => navigation.navigate("Doctor")}
            style={styles.text}
          >
            Doctor List
          </Text>

          <Text
            onPress={() => navigation.navigate("TermOfUse")}
            style={styles.text}
          >
            Terms of Use
          </Text>
          <Text
            onPress={() => navigation.navigate("PrivacyPolicy")}
            style={styles.text}
          >
            Privacy & Policy
          </Text>
          <Text
            onPress={() => navigation.navigate("HelpnSupport")}
            style={styles.text}
          >
            Help & Support
          </Text>
          <Text
            onPress={() => navigation.navigate("AboutReminderx")}
            style={styles.text}
          >
            About RemindeRX
          </Text>
          <Text
            onPress={() => navigation.navigate("AboutUs")}
            style={styles.text}
          >
            About Us
          </Text>
        </View>

        {!isLoading ? (
          <Text onPress={handleSignOut} style={styles.signOut}>
            Sign Out
          </Text>
        ) : (
          <LoadingRoots />
        )}

        <Text style={styles.version}>reminderx version 1.3.0</Text>
      </ScrollView>
    </View>
  );

  // Keep your original conditional rendering structure
  if (!isLoading) {
    return content;
  } else {
    content = <LoadingRoots />;
  }

  return <View style={styles.root}>{content}</View>;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
  },

  userInfo: {
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Color.textInput,
  },

  email: {
    fontFamily: Fonts.main,
    fontSize: 15,
    color: "white",
    marginTop: 5,
  },

  address: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 12,
  },

  links: {
    marginTop: 45,
    paddingHorizontal: 25,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontSize: 16,
    marginBottom: 25,
  },

  signOut: {
    color: "#fff",
    fontFamily: Fonts.main,
    fontSize: 16,
    marginTop: 50,
    paddingHorizontal: 25,
  },

  version: {
    textAlign: "center",
    fontFamily: Fonts.main,
    color: Color.tagLine,
    marginTop: 100,
  },
});
