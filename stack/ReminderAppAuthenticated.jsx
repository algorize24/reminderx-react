// react native
import { View } from "react-native";

// react navigation
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// expo-icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

// constants
import { Fonts } from "../constants/Font";
import { Color } from "../constants/Color";

// components
import HeaderTitle from "../components/header/HeaderTitle";
import DrawerHeader from "../components/header/DrawerHeader";

// reminderAuthenticated - screens
import ContactScreen from "../screens/reminderauthenticated/ContactScreen";
import ProfileScreen from "../screens/reminderauthenticated/ProfileScreen";
import ReminderScreen from "../screens/reminderauthenticated/ReminderScreen";
import InventoryScreen from "../screens/reminderauthenticated/InventoryScreen";
import DashboardScreen from "../screens/reminderauthenticated/DashboardScreen";

// reminderx - notif - main fn.

// -- add-reminder
import AddReminder from "../screens/reminderauthenticated/reminderx/add-reminder/AddReminder";

// -- how-often-do-you-take
import OftenTake from "../screens/reminderauthenticated/reminderx/how-often-do-you-take/OftenTake";
import OftenWeek from "../screens/reminderauthenticated/reminderx/how-often-do-you-take/Often-Week";
import OftenEveryday from "../screens/reminderauthenticated/reminderx/how-often-do-you-take/Often-Everyday";

// -- add-pills
import AddPills from "../screens/reminderauthenticated/reminderx/add-pills/AddPills";
import AddPillsWeek from "../screens/reminderauthenticated/reminderx/add-pills/AddPillsWeek";

// -- select-time
import SelectTime from "../screens/reminderauthenticated/reminderx/select-time/SelectTime";
import SelectTimeWeek from "../screens/reminderauthenticated/reminderx/select-time/SelectTimeWeek";

// -- select-compartment
import AddCompartmentWeek from "../screens/reminderauthenticated/reminderx/compartment-selection/AddCompartmentWeek";
import AddCompartmentEveryday from "../screens/reminderauthenticated/reminderx/compartment-selection/AddCompartmentEveryday";

// -- req-backend
import SetReminder from "../screens/reminderauthenticated/reminderx/req-backend/SetReminder";

// notification
import NotificationScreen from "../screens/reminderauthenticated/notification/NotificationScreen";

// connection
import DeviceConnection from "../screens/reminderauthenticated/connection/DeviceConnection";

// crud - screens

// -- add
import AddDoctor from "../screens/reminderauthenticated/add/AddDoctor";
import AddContact from "../screens/reminderauthenticated/add/AddContact";
import AddMedicine from "../screens/reminderauthenticated/add/AddMedicine";

// -- edit
import EditContact from "../screens/reminderauthenticated/edit/EditContact";
import EditDoctors from "../screens/reminderauthenticated/edit/EditDoctors";
import EditProfile from "../screens/reminderauthenticated/edit/EditProfile";
import EditInventory from "../screens/reminderauthenticated/edit/EditInventory";

// sub-profile - screens
import TermOfUse from "../screens/reminderxpolicy/TermOfUse";
import Aboutus from "../screens/reminderauthenticated/subprofile/Aboutus";
import DoctorList from "../screens/reminderauthenticated/subprofile/DoctorList";
import PrivacyPolicyScreen from "../screens/reminderxpolicy/PrivacyPolicyScreen";
import HelpSupport from "../screens/reminderauthenticated/subprofile/HelpSupport";
import Aboutreminderx from "../screens/reminderauthenticated/subprofile/Aboutreminderx";

// stack navigator
const Stack = createNativeStackNavigator();

// drawer navigator
const Drawer = createDrawerNavigator();

// this fn component will show if the user is authenticated. drawer.
function ReminderDrawerAuthenticated() {
  return (
    <Drawer.Navigator
      drawerContentStyle={{
        backgroundColor: Color.bgColor,
      }}
      drawerContent={(props) => <DrawerHeader {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Color.bgColor },
        headerTintColor: "#fff",
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: "center",
        drawerStyle: { backgroundColor: Color.bgColor },
        drawerLabelStyle: {
          color: Color.tagLine,
          fontFamily: Fonts.main,
        },
        drawerActiveBackgroundColor: Color.container,
        gestureEnabled: true,
        swipeEnabled: true,
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="notifications"
              size={20}
              color="#fff"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Notification")}
            />

            <AntDesign
              name="link"
              size={20}
              color="#fff"
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("Connection")}
            />
          </View>
        ),
      })}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          title: "Medicine Storage",
        }}
      />
      <Drawer.Screen
        name="EventSchedule"
        component={ReminderScreen}
        options={{
          title: "Medication Reminder",
        }}
      />

      <Drawer.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          title: "Emergency Contact ",
        }}
      />

      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

export default function ReminderAppAuthenticated() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen
        name="ReminderDrawerAuthenticated"
        component={ReminderDrawerAuthenticated}
        options={{
          headerShown: false,
          gestureEnabled: false,
          headerTitle: "",
        }}
      />

      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: "Notification",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="Connection"
        component={DeviceConnection}
        options={{
          title: "Device Connection",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{
          title: "Contact Information",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="EditContact"
        component={EditContact}
        options={{
          title: "Edit Contact",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="AddReminder"
        component={AddReminder}
        options={{
          headerTitle: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="OftenTake"
        component={OftenTake}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="OftenEveryday"
        component={OftenEveryday}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="OftenWeek"
        component={OftenWeek}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddPills"
        component={AddPills}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddPillsWeek"
        component={AddPillsWeek}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="PickTime"
        component={SelectTime}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="PickTimeWeek"
        component={SelectTimeWeek}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddCompartmentEveryday"
        component={AddCompartmentEveryday}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddCompartmentWeek"
        component={AddCompartmentWeek}
        options={{
          title: "",
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="SetReminder"
        component={SetReminder}
        options={{
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{
          title: "Add Medicine",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main },
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="EditInventory"
        component={EditInventory}
        options={{
          title: "Edit Inventory",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "Edit Profile",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="AddDoctor"
        component={AddDoctor}
        options={{
          title: "Add Doctor",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="EditDoctor"
        component={EditDoctors}
        options={{
          title: "Edit Doctor",
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="Doctor"
        component={DoctorList}
        options={({ navigation }) => ({
          headerTitle: "",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
          headerTintColor: "white",
          headerTitleAlign: "center",
        })}
      />

      <Stack.Screen
        name="AboutUs"
        component={Aboutus}
        options={{
          title: "",
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="AboutReminderx"
        component={Aboutreminderx}
        options={{
          title: "",
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="HelpnSupport"
        component={HelpSupport}
        options={{
          title: "",
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={{
          headerTintColor: "white",
          title: "Terms of Use",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />

      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerTintColor: "white",
          title: "Privacy Policy",
          headerTitleAlign: "center",
          headerTitleStyle: { fontFamily: Fonts.main, fontSize: 14 },
        }}
      />
    </Stack.Navigator>
  );
}
