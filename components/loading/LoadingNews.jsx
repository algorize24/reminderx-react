import { View, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import AuthText from "../header/AuthText";

export default function LoadingNews() {
  return (
    <View style={styles.root}>
      <AuthText style={styles.header_text}>News Articles</AuthText>
      <View style={styles.containerEmpty}>
        <View style={styles.imgEmpty}></View>
        <View style={styles.textEmpty}></View>
        <View style={styles.headlineEmpty}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 20,
  },

  containerEmpty: {
    flex: 1,
    marginTop: 10,
    backgroundColor: Color.container,
    borderRadius: 8,
    width: "screen",
    height: 200,
    padding: 10,
  },

  header_text: {
    fontSize: 18,
  },

  imgEmpty: {
    width: "screen",
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: Color.bgColor,
  },

  textEmpty: {
    width: 120,
    backgroundColor: Color.bgColor,
    height: 20,
    borderRadius: 50,
    marginBottom: 10,
  },

  headlineEmpty: {
    width: 355,
    backgroundColor: Color.bgColor,
    height: 20,
    borderRadius: 50,
    marginBottom: 3,
  },
});
