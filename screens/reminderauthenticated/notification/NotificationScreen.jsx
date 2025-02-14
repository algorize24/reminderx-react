import { View, StyleSheet, Pressable, FlatList, Platform } from "react-native";

import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// components
import ErrorComponent from "../../../components/dashboard/ErrorComponent";
import IsEmpty from "../../../components/dashboard/isEmpty";
import LoadingNotif from "../../../components/loading/LoadingNotif";
import ListNotification from "../../../components/desc/ListNotification";

// empty image
import EmptyImage from "../../../assets/others/notification.png";

// axios
import axios from "axios";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";

// firebase
import { auth } from "../../../firebase/firebase";

// authcontext
import { useAuth } from "../../../context/authContext";

// connection path
const connection =
  Platform.OS === "android"
    ? `${android_url}/notification`
    : `${ios_url}/notification`;

export default function NotificationScreen() {
  // context
  const { user } = useAuth();

  // state for data
  const [notificationData, setNotificationData] = useState([]);

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // error state
  const [error, setError] = useState("");

  const fetchNotification = async () => {
    setIsLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();

        const response = await axios.get(connection, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort notifications by time in descending order
        const sortedData = response.data.notification.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );

        setNotificationData(sortedData);
      }
    } catch (error) {
      if (!error.response) {
        setError(
          "Unable to connect. Please check your internet connection and try again."
        );
      } else if (error.response.status >= 400 && error.response.status < 500) {
        setError(
          `Error ${error.response.status}: ${
            error.response.data.message ||
            "An unexpected error occur. Please try again later"
          }`
        );
      } else if (error.response.status >= 500) {
        setError(
          `Error ${error.response.status}: ${
            error.response.data.message ||
            "An unexpected error occured on the server"
          }`
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // auto refetch
  useFocusEffect(
    useCallback(() => {
      fetchNotification();
    }, [user])
  );
  return (
    <>
      {error ? (
        <View style={styles.error}>
          <ErrorComponent message={error} />
        </View>
      ) : isLoading ? (
        <LoadingNotif />
      ) : notificationData.length > 0 ? (
        <View style={styles.root}>
          <FlatList
            overScrollMode="never"
            bounces={false}
            data={notificationData}
            key={(item) => item._id.toString()}
            renderItem={({ item }) => <ListNotification itemData={item} />}
          />
        </View>
      ) : (
        <View style={styles.isEmpty}>
          <IsEmpty
            image={EmptyImage}
            message={"No reminders at the moment. Stay healthy and take care."}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  root: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },

  isEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
});
