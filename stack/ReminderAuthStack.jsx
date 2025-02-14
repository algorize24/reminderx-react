// constants
import { Color } from "../constants/Color";
import { Fonts } from "../constants/Font";

// react navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import UserInfo from "../screens/reminderxauth/UserInfo";
import AuthLogin from "../screens/reminderxauth/AuthLogin";
import AuthSelect from "../screens/reminderxauth/AuthSelect";
import AuthSignUp from "../screens/reminderxauth/AuthSignUp";
import TermOfUse from "../screens/reminderxpolicy/TermOfUse";
import SetPassword from "../screens/reminderxauth/SetPassword";
import ResetPassword from "../screens/reminderxauth/ResetPassword";
import ForgotPassword from "../screens/reminderxauth/ForgotPassword";
import CreatingAccount from "../screens/reminderxauth/CreatingAccount";
import PrivacyPolicyScreen from "../screens/reminderxpolicy/PrivacyPolicyScreen";

// stack navigator
const Stack = createNativeStackNavigator();

// header design avoid DRY
const defaultHeaderOptions = {
  headerTintColor: "white",
  headerTitleAlign: "center",
  headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
};

export default function ReminderAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen
        name="AuthSelect"
        component={AuthSelect}
        options={{
          headerTitle: "",
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="Signin"
        component={AuthLogin}
        options={{ ...defaultHeaderOptions, title: "" }}
      />
      <Stack.Screen
        name="Signup"
        component={AuthSignUp}
        options={{ ...defaultHeaderOptions, title: "" }}
      />

      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{ ...defaultHeaderOptions, title: "" }}
      />

      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{ ...defaultHeaderOptions, title: "" }}
      />

      <Stack.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={{
          ...defaultHeaderOptions,
          title: "Terms of Use",
        }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          ...defaultHeaderOptions,
          title: "Privacy Policy",
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ ...defaultHeaderOptions, title: "" }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTintColor: "white",
          title: "",
          headerShown: false,
          gestureEnabled: false,
        }}
      />

      <Stack.Screen
        name="CreatingAccount"
        component={CreatingAccount}
        options={{
          headerTintColor: "white",
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
