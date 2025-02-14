import { View, StyleSheet, FlatList, Platform, Alert } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

// image empty
import EmptyImage from "../../assets/others/reminder.png";

// constants
import { Color } from "../../constants/Color";

// component
import CalendarList from "../../components/dashboard/CalendarList";
import MainButton from "../../components/buttons/MainButton";
import ReminderContainer from "../../components/dashboard/ReminderContainer";
import IsEmpty from "../../components/dashboard/isEmpty";
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import LoadingReminder from "../../components/loading/LoadingReminder";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// moment
import moment from "moment";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// connection path
const connection =
  Platform.OS === "android" ? `${android_url}/reminder` : `${ios_url}/reminder`;

export default function ReminderScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying reminder
  const [displayReminder, setDisplayReminder] = useState([]);

  // track the reminders if its alr updated
  const [remindersUpdated, setRemindersUpdated] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error state

  // state to select a date in calendar
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // fetch all the data from reminder collection, also specified by day.
  const fetchReminder = async () => {
    setIsLoading(true);
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const token = await currentUser.getIdToken();
        const response = await axios.get(connection, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const selectedDay = moment(selectedDate).format("dddd");

        const filteredReminders = response.data.reminder.filter((reminder) => {
          if (reminder.specificDays.length === 0) {
            return true; // No specific days, so show every day
          }
          return reminder.specificDays.includes(selectedDay); // only include the selected day if in specificDays
        });

        const flattenedReminders = filteredReminders
          .flatMap((reminder) => {
            const reminderTimes = Array.isArray(reminder.times)
              ? reminder.times
              : [];

            return reminderTimes.map((time, index) => {
              const todayDate = moment(selectedDate).format("YYYY-MM-DD");

              // Filter history for the current date
              const history = reminder.history || [];
              const historyForToday = history.find(
                (entry) => entry.forDate === todayDate
              );

              const status = historyForToday
                ? historyForToday.status
                : "pending";

              return {
                _id: reminder._id,
                time: new Date(time),
                medicineName: reminder.medicineName,
                dosage: reminder.dosage[index] || 0,
                specificDays: reminder.specificDays,
                compartment: reminder.compartment,
                status,
              };
            });
          })
          .sort((a, b) => a.time - b.time);

        setDisplayReminder(flattenedReminders);
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

  // auto re-fetch
  useFocusEffect(
    useCallback(() => {
      fetchReminder();
    }, [user, selectedDate, remindersUpdated])
  );

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <CalendarList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isLoading ? (
          <LoadingReminder />
        ) : displayReminder && displayReminder.length > 0 ? (
          <FlatList
            alwaysBounceVertical={false}
            bounces={false}
            overScrollMode="never"
            data={displayReminder}
            keyExtractor={(item, index) =>
              `${item.time}-${item.medicineName}-${index}`
            }
            renderItem={({ item }) => (
              <ReminderContainer
                itemData={item}
                setRemindersUpdated={setRemindersUpdated}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.empty}>
            <IsEmpty
              image={EmptyImage}
              message={"No upcoming reminders for today"}
            />
          </View>
        )}
      </View>

      <MainButton
        onPress={() => navigation.navigate("AddReminder")}
        style={styles.button}
      >
        Add Reminder
      </MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },

  container: {
    flex: 1,
  },

  button: {
    marginTop: 30,
    marginBottom: 40,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
  },

  error: {
    flex: 1,
    justifyContent: "center",
  },
});
