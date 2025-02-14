import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLayoutEffect, useState } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// component
import AuthText from "../../../../components/header/AuthText";
import LoadingModal from "../../../../components/loading/LoadingModal";

// context
import { useReminder } from "../../../../context/reminderContext";

export default function OftenTake({ navigation }) {
  // reminderContext
  const { medicationName } = useReminder();

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleOftenEveryday = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("OftenEveryday");
    }, 1000);
  };

  const handleOftenWeek = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("OftenWeek");
    }, 1000);
  };

  // change the title dynamic
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  return (
    <View style={styles.root}>
      {isLoading && <LoadingModal visible={isLoading} />}
      <AuthText style={styles.text}>How often do you take it?</AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Pressable
            onPress={handleOftenEveryday}
            style={({ pressed }) => [styles.inputs, pressed && styles.press]}
          >
            <Text style={styles.textInterval}>Every day</Text>
          </Pressable>

          <Pressable
            onPress={handleOftenWeek}
            style={({ pressed }) => [styles.inputs, pressed && styles.press]}
          >
            <Text style={styles.textInterval}>Specific days of the week</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 14,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  container: {
    flex: 1,
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  subContainer: {
    marginTop: 30,
    marginHorizontal: 30,
  },

  inputs: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },

  press: {
    opacity: 0.7,
  },

  textInterval: {
    color: "#fff",
    fontFamily: Fonts.main,
  },
});
