import { View, StyleSheet, FlatList, Platform } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

// empty image
import EmptyImage from "../../assets/others/inventoryempty.png";

// constant
import { Color } from "../../constants/Color";

// components
import ListInventory from "../../components/desc/ListInventory";
import Label from "../../components/dashboard/Label";
import ErrorComponent from "../../components/dashboard/ErrorComponent";
import IsEmpty from "../../components/dashboard/isEmpty";
import SortingContainer from "../../components/inventory/SortingContainer";
import LoadingInventory from "../../components/loading/LoadingInventory";

// axios
import axios from "axios";

// auth context
import { useAuth } from "../../context/authContext";

// firebase
import { auth } from "../../firebase/firebase";

// connection of android and ios
import { android_url, ios_url } from "../../constants/Url";

// connection path
const connection =
  Platform.OS === "android"
    ? `${android_url}/inventory`
    : `${ios_url}/inventory`;

export default function InventoryScreen({ navigation }) {
  // context
  const { user } = useAuth();

  // state for displaying inventory
  const [displayInventory, setDisplayInventory] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // error state

  // track the current sort
  const [sortCriteria, setSortCriteria] = useState("default");

  // handle sort change
  const handleSortChange = (newCriteria) => {
    setSortCriteria(newCriteria); // Update the state for future reference
    fetchInventory(newCriteria); // Pass the new criteria directly
  };

  // display inventory by certain user
  const fetchInventory = async (criteria = sortCriteria) => {
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

        let inventoryData = response.data.inventory;

        // Apply sorting based on the provided criteria
        if (criteria === "ascend") {
          inventoryData.sort((a, b) =>
            a.medicine_name.localeCompare(b.medicine_name)
          );
        } else if (criteria === "descend") {
          inventoryData.sort((a, b) =>
            b.medicine_name.localeCompare(a.medicine_name)
          );
        } else if (criteria === "expDate") {
          inventoryData.sort(
            (a, b) => new Date(a.expiration_date) - new Date(b.expiration_date)
          );
        } else if (criteria === "stock") {
          // Sort by low stock (<= 5) first
          inventoryData.sort((a, b) => a.stock - b.stock);
        } else if (criteria === "compartment_ascend") {
          // Sort by compartment ascending (1-5)
          inventoryData.sort((a, b) => a.compartment - b.compartment);
        } else if (criteria === "compartment_descend") {
          // Sort by compartment descending (5-1)
          inventoryData.sort((a, b) => b.compartment - a.compartment);
        }

        setDisplayInventory(inventoryData);
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
      fetchInventory();
    }, [user])
  );

  return (
    <View style={styles.root}>
      <View style={styles.dataContainer}>
        <Label
          onPress={() => {
            navigation.navigate("AddMedicine");
          }}
        >
          Medicine Inventory
        </Label>

        <SortingContainer onSortChange={handleSortChange} />

        {error ? (
          <View style={styles.error}>
            <ErrorComponent message={error} />
          </View>
        ) : isLoading ? (
          <LoadingInventory />
        ) : displayInventory && displayInventory.length > 0 ? (
          <FlatList
            overScrollMode="never"
            bounces={false}
            data={displayInventory}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => <ListInventory itemData={item} />}
            numColumns={1}
            key={1}
          />
        ) : (
          <View style={styles.isEmpty}>
            <IsEmpty
              image={EmptyImage}
              message={"You haven’t added any medicine yet"}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
  },

  dataContainer: {
    marginTop: 35,
    flex: 1,
    marginBottom: 20,
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
