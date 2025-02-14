import { View, FlatList, StyleSheet, Text } from "react-native";
import { useState, useEffect } from "react";

// components
import AuthText from "../header/AuthText";
import ListArticle from "../desc/ListArticle";
import LoadingNews from "../loading/LoadingNews";
import IsEmpty from "./isEmpty";
import ErrorComponent from "./ErrorComponent";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// axios
import axios from "axios";

// empty image
import EmptyImage from "../../assets/others/news_empty.png";

export default function NewsArticle() {
  // state to get the news data
  const [newsData, setNewsData] = useState([]);

  // loading state
  const [isLoading, setIsLoading] = useState(true);

  // error state
  const [error, setError] = useState("");

  // state to check if there are no articles
  const [noArticles, setNoArticles] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines`,
          {
            params: {
              category: "health",
              pageSize: 4,
              apiKey: "3669701fff48405db7cb3a2ed7dfdd17",
            },
          }
        );

        // Filter articles and check for no articles
        const filteredArticles = response.data.articles.filter(
          (article) => !article.title.includes("[Removed]")
        );

        if (filteredArticles.length === 0) {
          setNoArticles(true);
        } else {
          setNewsData(filteredArticles);
        }

        setNewsData(filteredArticles);
      } catch (error) {
        setError(
          "Something went wrong while fetching the news article. Please try again later.",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // loading state
  if (isLoading) {
    return <LoadingNews />;
  }

  return (
    <View style={styles.root}>
      {error ? (
        <View style={styles.error}>
          <ErrorComponent message={error} />
        </View>
      ) : noArticles ? (
        <View style={styles.empty}>
          <IsEmpty
            image={EmptyImage}
            message={"No articles available at the moment"}
          />
        </View>
      ) : (
        <>
          <AuthText style={styles.header_text}>News Articles</AuthText>
          <FlatList
            data={newsData}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => <ListArticle itemData={item} />}
            overScrollMode="never"
            bounces={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginVertical: 20,
  },

  header_text: {
    fontSize: 18,
  },

  error: {
    flex: 1,
    justifyContent: "center",
  },

  errorText: {
    marginTop: 30,
    fontFamily: Fonts.main,
    textAlign: "center",
    color: Color.redColor,
    fontSize: 13,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
  },
});
