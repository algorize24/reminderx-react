import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function ListContact({ itemData }) {
  const { _id, name, phone_number } = itemData;

  const navigation = useNavigation();

  const formatPhoneNumber = (number) => {
    if (!number) return ""; // return empty string if number is undefined or null

    const cleaned = String(number).replace(/\D/g, ""); // remove any non-digit characters
    const countryCode = "+63"; // the country code for the philippines
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/); // standard format for a 10-digit number

    if (match) {
      // return the formatted phone number with country code
      return `${countryCode} ${match[1]} ${match[2]} ${match[3]}`;
    }

    return `${countryCode} ${cleaned}`; // return country code + cleaned number if it doesn't match the expected format
  };

  // call action
  const handleCall = (phone_number) => {
    const formattedNumber = formatPhoneNumber(phone_number);
    Linking.openURL(`tel:${formattedNumber}`);
  };

  // text action
  const handleText = (phone_number) => {
    const formattedNumber = formatPhoneNumber(phone_number);
    Linking.openURL(`sms:${formattedNumber}`);
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EditContact", {
          contactId: _id,
          name: name,
          number: phone_number,
        });
      }}
      style={({ pressed }) => [styles.root, pressed && styles.press]}
    >
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require("../../assets/others/user.png")}
        />

        <View style={styles.user}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.number}>{formatPhoneNumber(phone_number)} </Text>
        </View>
      </View>

      <View style={styles.action}>
        <Text
          onPress={() => handleCall(phone_number)}
          style={styles.actionCall}
        >
          Call
        </Text>
        <Text
          onPress={() => handleText(phone_number)}
          style={styles.actionName}
        >
          Text
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginVertical: 10,
  },

  press: {
    opacity: 0.7,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Color.textInput,
  },

  name: {
    fontFamily: Fonts.main,
    color: "#fff",
    textTransform: "capitalize",
  },

  number: {
    fontFamily: Fonts.main,
    color: "#fff",
  },

  user: {
    marginLeft: 10,
  },

  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  actionName: {
    marginHorizontal: 3,
    fontFamily: Fonts.main,
    color: "#fff",
  },

  actionCall: {
    marginHorizontal: 3,
    fontFamily: Fonts.main,
    color: Color.greenColor,
  },
});
