import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/theme";
import { Feather as Icon } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  React.useEffect(() => {
    StatusBar.setBackgroundColor(colors.secondary);
    // StatusBar.setTranslucent(true);
    // StatusBar.setHidden(true);
  }, []);

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <View>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: colors.primary,
              marginTop: 20,
            }}
          >
            Monday Mar,19
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.primary,
              }}
            >
              Welcome
            </Text>
            <Icon color={colors.primary} name="plus-circle" size={25} />
          </View>
          <View
            style={{
              backgroundColor: colors.secondaryLight,
              marginTop: 20,
              marginBottom:15,
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
            onTouchEnd={()=>alert("search")}
          >
            <Icon name="search" size={20} color={colors.primary} />
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                marginLeft:20
              }}
            >
              Search
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={styles.headerText}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.welcomeText}>to</Text>
        <Text style={styles.welcomeText}>SmartSign</Text>
      </View> */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorContent}>
          <Icon name="arrow-down" size={30} />
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.entryButton}
          onPress={() => navigation.navigate("EntryHome")}
        >
          <Text style={styles.buttonText}>Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.entryButton, styles.exitButton]}
          onPress={() => navigation.navigate("EntryHome")}
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    // marginTop: StatusBar.currentHeight,
    width: "100%",
    paddingHorizontal: 30,
    backgroundColor: colors.secondary,
  },

  icon: {
    position: "absolute",
    left: 30,
    top: 15,
  },
  headerText: {
    marginHorizontal: 30,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 40,
    color: colors.secondary,
    fontWeight: "bold",
  },
  buttons: {
    paddingHorizontal: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
  },
  entryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  exitButton: {
    backgroundColor: colors.secondaryLight,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  indicatorContainer: {
    alignItems: "center",
    marginTop: 100,
    shadowRadius: 10,
    shadowColor: "#eee",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10 },
  },
  indicatorContent: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
