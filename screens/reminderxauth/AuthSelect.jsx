import { View, StyleSheet } from "react-native";

// constants
import { Color } from "../../constants/Color";

// components
import MainButton from "../../components/buttons/MainButton";
import Title from "../../components/header/Title";

// context
import { useAuth } from "../../context/authContext";

export default function AuthSelect({ navigation }) {
  const { user } = useAuth();
  if (user) {
    console.log("authenticated");
  } else {
    console.log("not authenticated");
  }

  const handleLogIn = () => {
    navigation.navigate("Signin");
  };

  const handleCreateAccount = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Title />
      </View>

      <View style={styles.buttonView}>
        <MainButton onPress={handleLogIn} style={styles.login}>
          Log In
        </MainButton>
        <MainButton
          onPress={handleCreateAccount}
          pressedStyle={styles.buttonStyle}
          textStyle={styles.text}
        >
          Create Account
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 98,
  },

  textContainer: {
    alignItems: "center",
  },

  buttonStyle: {
    backgroundColor: Color.container,
  },

  text: {
    color: Color.purpleColor,
  },

  buttonView: {
    marginTop: 183,
  },

  login: {
    marginBottom: 20,
  },
});
