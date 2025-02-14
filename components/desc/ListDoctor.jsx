import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListDoctor({ itemData }) {
  const { _id, doctor_name, specialty, email, mobile_number, address } =
    itemData;

  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EditDoctor", {
          doctorId: _id,
          name: doctor_name,
          specialty,
          email,
          number: mobile_number,
          address,
        });
      }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.root}>
        <View style={styles.container}>
          <Image
            style={styles.img}
            source={require("../../assets/others/doctor_icon.png")}
          />
          <View style={styles.dataContainer}>
            <Text style={styles.name}>{doctor_name}</Text>
            <Text style={styles.title}>{specialty}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },

  container: {
    flexDirection: "row",
    width: "90%",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Color.container,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },

  dataContainer: {
    marginLeft: 12,
  },

  img: {
    width: 50,
    height: 50,
  },

  name: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 16,
    textTransform: "capitalize",
  },

  title: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    textTransform: "capitalize",
  },

  pressed: {
    opacity: 0.7,
  },
});
