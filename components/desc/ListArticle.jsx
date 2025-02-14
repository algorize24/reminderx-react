import { StyleSheet, Text, Pressable, Image, Linking } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListArticle({ itemData }) {
  const {
    source: { name },
    title,
    publishedAt,
    urlToImage,
    url,
  } = itemData;

  // go to this url..
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <Pressable onPress={handlePress} style={styles.press_container}>
      <Image source={{ uri: urlToImage }} style={styles.img} />

      <Text style={[styles.name]}>{name}</Text>

      <Text style={[styles.title]}>{title}</Text>
      <Text style={styles.date}>{new Date(publishedAt).toDateString()}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  press_container: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: Color.container,
    borderRadius: 8,
  },

  img: {
    width: "screen",
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },

  name: {
    fontSize: 12,
    fontFamily: Fonts.main,
    color: Color.tagLine,
  },

  date: {
    color: Color.tagLine,
    fontFamily: Fonts.main,
    fontSize: 12,
  },

  title: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 8,
    fontFamily: Fonts.main,
    color: "#fff",
  },
});
