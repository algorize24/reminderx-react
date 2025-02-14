import React, { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

const LocationContext = createContext(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export default function LocationContextProvider({ children }) {
  // state for location permission
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // state to get the location
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === "android" && !Device.isDevice) {
        setError(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Reverse geocoding to get address
      const { latitude, longitude } = location.coords;
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geocode && geocode.length > 0) {
        const { city, region, country } = geocode[0];
        setAddress(`${city}, ${region}, ${country}`);
      }
    }

    getCurrentLocation();
  }, []);

  const value = {
    location,
    error,
    address,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
