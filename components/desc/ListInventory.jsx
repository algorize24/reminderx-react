import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListInventory({ itemData }) {
  // this data is from the InventoryScreen.jsx
  const { _id, medicine_name, dosage, expiration_date, stock, compartment } =
    itemData;
  const navigation = useNavigation();

  // format expiration date YYYY/MM/DD
  const formattedDate = new Date(expiration_date).toISOString().split("T")[0];
  return (
    <>
      <Text style={styles.cid}>CID: {compartment}</Text>
      <Pressable
        onPress={() => {
          navigation.navigate("EditInventory", {
            medicineId: _id,
            medicine: medicine_name,
            dosage,
            expiration_date,
            stock,
            compartment,
          });
        }}
        style={({ pressed }) => [styles.medView, pressed && styles.pressed]}
      >
        <View style={styles.main_container}>
          <View style={styles.container}>
            <Image
              style={styles.img}
              source={require("../../assets/others/pill.png")}
            />

            <View style={styles.textContainer}>
              <Text style={styles.name}>{medicine_name}</Text>
              <Text style={styles.dosage}>{dosage}mg</Text>
            </View>
          </View>

          <View style={styles.nums_container}>
            <View>
              <Text style={styles.info}>Expiration Date</Text>
              <Text style={styles.data}>{formattedDate}</Text>
            </View>

            <View style={styles.stock_container}>
              <Text style={styles.info}>Stock</Text>
              <Text style={styles.data}>{stock}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  cid: {
    paddingTop: 15,
    paddingHorizontal: 12,
    fontFamily: Fonts.main,
    color: Color.greenColor,
  },

  medView: {
    flex: 1,
    backgroundColor: Color.container,
    borderRadius: 4,
    margin: 5,
    padding: 12,
  },

  pressed: {
    opacity: 0.7,
  },

  main_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  container: {
    flexDirection: "row",
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  textContainer: {
    marginLeft: 10,
  },

  name: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 14,
    textTransform: "capitalize",
  },

  dosage: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 13,
  },

  info: {
    fontFamily: Fonts.mainLight,
    color: Color.tagLine,
    fontSize: 12,
  },

  data: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 13,
  },

  stock_container: {
    marginTop: 10,
  },
});
