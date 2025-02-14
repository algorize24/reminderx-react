import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";

import { Color } from "../../constants/Color";

import HeaderTitle from "../header/HeaderTitle";

export default function LoadingDrawer() {
  return (
    <SafeAreaView style={styles.root}>
      <HeaderTitle style={styles.text} />
      <View style={styles.user}>
        <View style={styles.img}></View>
        <Text style={styles.dataText}></Text>
        <Text style={styles.dataText}></Text>

        <View style={styles.drawerContainer}>
          <View style={styles.drawer}></View>
          <View style={styles.drawer}></View>
          <View style={styles.drawer}></View>
          <View style={styles.drawer}></View>
          <View style={styles.drawer}></View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
    paddingTop: 10,
  },

  text: {
    paddingLeft: 12,
  },

  user: {
    marginTop: 12,
    padding: 16,
    marginBottom: 50,
  },

  img: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: Color.container,
  },

  dataText: {
    backgroundColor: Color.container,
    borderRadius: 20,
    marginBottom: 10,
  },
  drawerContainer: {
    marginTop: 50,
  },
  drawer: {
    backgroundColor: Color.container,
    height: 40,
    width: "screen",
    marginVertical: 8,
    borderRadius: 10,
  },
});
