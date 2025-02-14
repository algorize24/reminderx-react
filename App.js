// react
import { useState, useEffect } from "react";

// expo
import { StatusBar } from "expo-status-bar";

// react-navigation
import { NavigationContainer } from "@react-navigation/native";

// custom-fonts
import * as Font from "expo-font";

// splash screen
import * as SplashScreen from "expo-splash-screen";

// notfication
import * as Notifications from "expo-notifications";

// components
import Splash from "./components/splash/Splash";

// icons
import {
  Fontisto,
  Feather,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome6,
  Ionicons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

// context
import AuthContextProvider from "./context/authContext";
import UserContextProvider from "./context/userContext";
import ReminderContextProvider from "./context/reminderContext";
import LocationContextProvider from "./context/locationContext";
import NotificationContextProvider from "./context/notificationContext";

// auth-context
import { useAuth } from "./context/authContext";

// stack-screen
import ReminderAuthStack from "./stack/ReminderAuthStack";
import ReminderAppAuthenticated from "./stack/ReminderAppAuthenticated";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// check if policystack have already been seen, check if authenticated or not.
function ReminderNavigation() {
  // auth-context
  const { user, isLoading, isEmailVerified } = useAuth();

  // track the auth
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsAuthChecked(true);
    }
  }, [isLoading]);

  // show the splash screen if stack is loading
  if (!isAuthChecked) {
    return <Splash />;
  }

  // Check if the user has signed up but not verified their email
  if (user && !isEmailVerified) {
    // redirect to creatingAccount screen under reminder-auth-stack
    return <ReminderAuthStack />;
  }

  // otherwise, render the authenticated screen
  return user ? <ReminderAppAuthenticated /> : <ReminderAuthStack />;
}

// main function
export default function App() {
  // check if the screen is ready
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any other resources
        await Font.loadAsync({
          "work-sans": require("./assets/fonts/WorkSans-Bold.ttf"),
          "work-light": require("./assets/fonts/WorkSans-Light.ttf"),
          "merri-weather": require("./assets/fonts/Merriweather-Regular.ttf"),
          ...Fontisto.font,
          ...Feather.font,
          ...Entypo.font,
          ...MaterialCommunityIcons.font,
          ...MaterialIcons.font,
          ...FontAwesome6.font,
          ...FontAwesome.font,
          ...Ionicons.font,
          ...AntDesign.font,
        });
      } catch (err) {
        console.warn(err);
      } finally {
        // Once everything is ready, set the state and hide the splash screen
        setAppIsReady(true);
        await SplashScreen.hideAsync(); // Hide the default splash screen here
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    // show the splash screen  while fonts are loading
    return <Splash />;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <NotificationContextProvider>
          <LocationContextProvider>
            <UserContextProvider>
              <AuthContextProvider>
                <ReminderContextProvider>
                  <ReminderNavigation />
                </ReminderContextProvider>
              </AuthContextProvider>
            </UserContextProvider>
          </LocationContextProvider>
        </NotificationContextProvider>
      </NavigationContainer>
    </>
  );
}
