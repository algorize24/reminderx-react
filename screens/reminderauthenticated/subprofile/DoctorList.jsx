import { View, StyleSheet, FlatList, Platform, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";

// image
import EmptyImage from "../../../assets/others/doctorempty.png";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// component
import ListDoctor from "../../../components/desc/ListDoctor";
import ErrorComponent from "../../../components/dashboard/ErrorComponent";
import IsEmpty from "../../../components/dashboard/isEmpty";
import LoadingDoctor from "../../../components/loading/LoadingDoctor";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../../context/authContext";

// firebase
import { auth } from "../../../firebase/firebase";

// connection of android and ios
import { android_url, ios_url } from "../../../constants/Url";
import MainButton from "../../../components/buttons/MainButton";

const connection =
  Platform.OS === "android" ? `${android_url}/doctor` : `${ios_url}/doctor`;

export default function DoctorList({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying doctors
  const [doctorsData, setDoctorsData] = useState([]);

  // loadin state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // display doctor by certain user
  const fetchDoctor = async () => {
    setIsLoading(true);

    try {
      // check if the currentUser
      const currentUser = auth.currentUser;

      // if there's a currentUser
      if (currentUser) {
        // get the token
        const token = await currentUser.getIdToken();

        // request to backend
        const response = await axios.get(connection, {
          headers: {
            // send the token to backend for verification
            Authorization: `Bearer ${token}`,
          },
        });

        // get the response.data
        setDoctorsData(response.data.doctor);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.", error);
    } finally {
      setIsLoading(false);
    }
  };

  // auto re-fetch
  useFocusEffect(
    useCallback(() => {
      fetchDoctor();
    }, [user])
  );

  return (
    <View style={styles.root}>
      {error ? (
        <View style={styles.error}>
          <ErrorComponent message={error} />
        </View>
      ) : isLoading ? (
        <LoadingDoctor />
      ) : doctorsData && doctorsData.length > 0 ? (
        <FlatList
          overScrollMode="never"
          bounces={false}
          data={doctorsData}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <ListDoctor itemData={item} />}
        />
      ) : (
        <View style={styles.isEmpty}>
          <IsEmpty
            image={EmptyImage}
            message={"You haven’t added any doctor yet"}
          />
        </View>
      )}

      <View style={styles.button_container}>
        <MainButton
          onPress={() => navigation.navigate("AddDoctor")}
          style={styles.button}
        >
          Add Doctor
        </MainButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "space-between",
  },

  button_container: {
    alignItems: "center",
    marginBottom: 50,
  },

  button: {
    width: "90%",
  },
  errorText: {
    color: Color.redColor,
    fontFamily: Fonts.main,
    fontSize: 13,
    marginVertical: 10,
    textAlign: "center",
  },

  isEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  error: {
    flex: 1,
    justifyContent: "center",
  },
});
