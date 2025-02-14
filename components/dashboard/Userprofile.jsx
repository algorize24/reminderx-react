import { View, Text, Image, StyleSheet, Platform, Alert } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// constant
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// auth context
import { useAuth } from "../../context/authContext";

// component
import LoadingUserProfile from "../loading/LoadingUserProfile";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

const connection =
  Platform.OS === "android" ? `${android_url}/user/` : `${ios_url}/user/`;

export default function Userprofile() {
  // state for fetching user
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  // fetch the user from database
  const fetchUser = async () => {
    if (user) {
      try {
        const response = await axios.get(`${connection}${user.email}`);
        setUserInfo(response.data);
      } catch (error) {
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
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Re-fetch user data when screen is focused
  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Set loading before fetch
      fetchUser();
    }, [user])
  );

  // get the email and password and set a fall back
  const displayName = userInfo
    ? userInfo.name
    : "An unexpected error occured. Please try again later.";
  const address = userInfo
    ? userInfo.address
    : "An unexpected error occured. Please try again later.";

  // loading state for user info...
  if (loading) {
    return <LoadingUserProfile />;
  }

  return (
    <View style={styles.userInfo}>
      {userInfo && (
        <Image
          style={styles.img}
          source={require("../../assets/others/profile.png")}
        />
      )}
      <View style={styles.user}>
        <Text style={styles.email}>
          <Text style={styles.text}>Hi!</Text> {displayName}
        </Text>
        <Text style={styles.address}>{address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    marginVertical: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  img: {
    width: 45,
    height: 45,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Color.textInput,
  },

  user: {
    marginLeft: 10,
  },

  email: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 18,
    textTransform: "capitalize",
  },

  address: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 13,
  },

  text: {
    color: Color.purpleColor,
  },

  loading: {
    marginVertical: 30,
  },
});
