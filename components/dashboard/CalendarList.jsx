import { View, StyleSheet, FlatList, Pressable, Text } from "react-native";
import { useState } from "react";

// constant
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// moment for date
import moment from "moment/moment";

export default function CalendarList({ selectedDate, setSelectedDate }) {
  // State for the start of the current week (Monday)
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("isoWeek")
  );

  // Generate dates for the current week (Monday to Sunday)
  const generateWeekDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      // Get each date starting from the beginning of the ISO week (Monday)
      dates.push(currentWeekStart.clone().add(i, "days").format("YYYY-MM-DD"));
    }
    return dates;
  };

  // Helper function to format the text for the selected date
  const formatSelectedDateText = (date) => {
    const today = moment();
    const selected = moment(date);

    // Check if the selected date is today
    if (selected.isSame(today, "day")) {
      return `Today, ${selected.format("MMM DD")}`;
    }

    // Check if the selected date is tomorrow
    if (selected.isSame(today.add(1, "days"), "day")) {
      return `Tomorrow, ${selected.format("MMM DD")}`;
    }

    // Otherwise, show the day of the week and the date
    return selected.format("ddd, MMM DD");
  };

  // Function to handle next week button press
  const goToNextWeek = () => {
    setCurrentWeekStart(currentWeekStart.clone().add(1, "week"));
  };

  // Function to handle previous week button press
  const goToPreviousWeek = () => {
    setCurrentWeekStart(currentWeekStart.clone().subtract(1, "week"));
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          style={styles.flatList}
          horizontal
          data={generateWeekDates()} // Pass the array of dates to render
          keyExtractor={(item) => item} // Use the date string as the key
          renderItem={({ item }) => (
            <Pressable
              style={styles.pressableDate}
              onPress={() => setSelectedDate(item)} // Update the selected date on press
            >
              <View
                style={[
                  styles.viewSelect,
                  {
                    backgroundColor:
                      item === selectedDate
                        ? Color.purpleColor
                        : Color.container, // Highlight selected date
                  },
                ]}
              >
                <Text
                  style={[
                    styles.textDate,
                    {
                      color: item === selectedDate ? "white" : "#fff", // Change text color for selected date
                    },
                  ]}
                >
                  {moment(item).format("ddd")}{" "}
                  {/* Show day of the week (e.g., Mon) */}
                </Text>
                <Text
                  style={[
                    styles.textDate,
                    {
                      color: item === selectedDate ? "white" : "#fff", // Change text color for selected date
                    },
                  ]}
                >
                  {moment(item).format("DD")}{" "}
                  {/* Show day of the month (e.g., 01) */}
                </Text>
              </View>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.dateText}>
          {formatSelectedDateText(selectedDate)}
        </Text>
      </View>

      <View style={styles.selectionContainer}>
        <Pressable onPress={goToPreviousWeek}>
          <Text style={styles.selectionText}>{"Previous"}</Text>
        </Pressable>

        <Pressable onPress={goToNextWeek}>
          <Text style={styles.selectionText}>{"Next"}</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.container,
    height: 120,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 20,
  },

  pressableDate: {
    justifyContent: "center",
  },

  viewSelect: {
    padding: 10,
    borderRadius: 4,
  },

  textDate: {
    textAlign: "center",
    fontFamily: Fonts.main,
  },

  dateText: {
    fontFamily: Fonts.main,
    color: Color.purpleColor,
    marginBottom: 12,
  },

  selectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.container,
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 40,
  },

  selectionText: {
    fontFamily: Fonts.main,
    color: Color.purpleColor,
  },
});
