import { View, StyleSheet, Text, Image } from "react-native";

// chart
import { LineChart } from "react-native-chart-kit";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// component
import AuthText from "../header/AuthText";

export default function HealthOverview() {
  const heart_rate = {
    labels: ["", "", "", "", ""], // no labels
    datasets: [
      {
        data: [72, 78, 85, 90, 88, 92, 95], // heart rate data points (bpm)
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  const oxygen_sat = {
    labels: ["", "", "", "", ""], // no labels
    datasets: [
      {
        data: [96, 95, 97, 98, 97, 96, 99], // oxygen saturation data points (%)
        strokeWidth: 2, // Line thickness
      },
    ],
  };

  // styles for chart...
  const chartConfig = {
    backgroundGradientFrom: Color.container,
    backgroundGradientTo: Color.container,
    // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // white line and labels
    color: (opacity = 1) => `rgba(94, 173, 81, ${opacity})`, // green color
    propsForDots: {
      r: "0", // Hide dots
    },
  };
  return (
    <View style={styles.health_overview}>
      <AuthText style={styles.header_text}>Health Overview</AuthText>
      <Text style={styles.update}>Last update: Just now</Text>

      <View style={styles.container}>
        <View style={styles.data_container}>
          <Image
            style={styles.img}
            source={require("../../assets/dashboard/heart_rate.png")}
          />

          <View style={styles.sub_container}>
            <Text style={[styles.text, styles.title]}>Heart Rate</Text>
            <View style={styles.text_container}>
              <Text style={[styles.text, styles.data]}>95</Text>
              <Text style={[styles.text, styles.unit]}>bpm</Text>
            </View>
          </View>
        </View>

        <View>
          <LineChart
            data={heart_rate}
            width={150}
            height={50}
            chartConfig={chartConfig}
            bezier
            withInnerLines={false} // remove grid lines
            withOuterLines={false} // remove outer grid lines
            withVerticalLabels={false} // hide vertical labels
            withHorizontalLabels={false} // hide horizontal labels
            style={styles.chart}
          />
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.data_container}>
          <Image
            style={styles.img}
            source={require("../../assets/dashboard/oxygen_sat.png")}
          />

          <View style={styles.sub_container}>
            <Text style={[styles.text, styles.title]}>Oxygen Saturation</Text>
            <View style={styles.text_container}>
              <Text style={[styles.text, styles.data]}>95</Text>
              <Text style={[styles.text, styles.unit]}>sp02%</Text>
            </View>
          </View>
        </View>

        <View>
          <LineChart
            data={oxygen_sat}
            width={150}
            height={50}
            chartConfig={chartConfig}
            bezier
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={false}
            style={styles.chart}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header_text: {
    fontSize: 18,
  },

  container: {
    backgroundColor: Color.container,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },

  sub_container: {
    marginLeft: 10,
  },

  img: {
    width: 40,
    height: 40,
  },

  data_container: {
    flexDirection: "row",
    alignItems: "center",
  },

  text_container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  title: {
    marginBottom: -3,
    fontSize: 12,
  },

  data: {
    fontSize: 20,
  },

  unit: {
    marginLeft: 6,
    color: Color.tagLine,
    fontSize: 12,
  },

  text: {
    color: "#fff",
    fontFamily: Fonts.main,
  },

  update: {
    fontFamily: Fonts.mainLight,
    color: Color.tagLine,
    fontSize: 12,
    marginBottom: 20,
  },
});
