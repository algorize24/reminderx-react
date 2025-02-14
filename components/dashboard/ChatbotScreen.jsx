import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
} from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ChatbotScreen() {
  return (
    <View style={styles.root}>
      <ScrollView
        overScrollMode="never"
        bounces={false}
        style={styles.scrollView}
      >
        <View style={styles.botContainer}>
          <Text style={styles.botText}>Hi! What can I do for you?</Text>
          <Image
            source={require("../../assets/others/user.png")}
            style={styles.img}
          />
        </View>

        <View style={styles.userContainer}>
          <Image
            source={require("../../assets/others/user.png")}
            style={styles.img}
          />
          <Text style={styles.userText}>Hi! What can I do for you?</Text>
        </View>
      </ScrollView>

      <View style={styles.textInputContainer}>
        <TextInput
          autoCorrect={true}
          style={styles.input}
          placeholderTextColor={Color.tagLine}
          placeholder="Message RemindeRX "
        />

        <Pressable
          onPress={() => {
            console.log("test");
          }}
        >
          <MaterialIcons
            style={styles.icon}
            name="send"
            size={24}
            color={"#fff"}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  scrollView: {
    flex: 1,
    marginTop: 20,
    marginBottom: 70,
  },

  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: Color.container,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  input: {
    flex: 1,
    color: Color.tagLine,
    paddingVertical: 10,
  },

  icon: {
    marginLeft: 10,
  },

  botContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    marginVertical: 10,
  },

  botText: {
    fontFamily: Fonts.main,
    color: "#fff",
    backgroundColor: Color.container,
    maxWidth: 250,
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
  },

  userContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  userText: {
    fontFamily: Fonts.main,
    color: "#fff",
    backgroundColor: Color.container,
    maxWidth: 250,
    padding: 10,
    borderRadius: 15,
    marginLeft: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});
