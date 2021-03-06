import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { colors } from "../../constants/theme";
import { Feather as Icon } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import MyContext from "../../provider/ContextProvider";

import { useList } from "react-firebase-hooks/database";
import { db } from "../../../firebase";
import Loading from "../../components/Loading";

const Home = ({ navigation }) => {
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.secondary);
  }, []);

  const [signed, setSigned] = useState([]);

  let [snapshots, loading, error] = useList(db.ref("Vehicles"));

  useEffect(() => {
    db.ref("/SignedVehicles").on("value", (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      let items = { ...data };
      console.log({items});
      setSigned(Object.values(items));
    });
  }, []);

  const openMenu = () => {
    navigation.openDrawer();
  };

  const renderCard = (title, count, mt) => {
    return (
      <View style={[styles.gridItem, { marginTop: mt }]}>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 25,
            color: colors.accent,
            fontWeight: "bold",
            paddingTop: 10,
          }}
        >
          {count}
        </Text>
      </View>
    );
  };

  if (loading) return <Loading />;

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"]
  const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const date = new Date()
  const day = date.getDay()
  const month = date.getMonth();
  const d = date.getDate();

  return (
    <SafeAreaView style={styles.container}>
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
            {days[day]} {months[month]}, {d}
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
              marginBottom: 15,
              padding: 10,
              borderRadius: 10,
              flexDirection: "row",
            }}
            onTouchEnd={() => navigation.navigate("Search Vehicle")}
          >
            <Icon name="search" size={20} color={colors.primary} />
            <Text
              style={{
                fontSize: 16,
                color: colors.primary,
                marginLeft: 20,
              }}
            >
              Search
            </Text>
          </View>
        </View>

        <View style={[styles.grid, { marginTop: 0 }]}>
          {renderCard("Total", snapshots.length, 0)}
          {renderCard("Today's Entry", signed.length, 0)}
          {renderCard("Today's Exit", 30, 20)}
          {renderCard("Current", 50, 20)}
        </View>
      </View>

      <View
        style={{
          marginTop: 40,
          alignItems: "center",
          borderBottomWidth: 2,
          borderBottomColor: colors.secondaryLight,
          marginHorizontal: 30,
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: colors.primary,
            textTransform: "uppercase",
          }}
        >
          Record Entry or Exit
        </Text>
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
          // onPress={() => loadVehicle()}
        >
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    width: "100%",
    paddingHorizontal: 30,
    backgroundColor: colors.secondary,
  },

  icon: {
    position: "absolute",
    left: 30,
    top: 15,
  },
  buttons: {
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  entryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 20,
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  exitButton: {
    backgroundColor: colors.secondaryLight,
    marginRight: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.primary,
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  gridItem: {
    backgroundColor: colors.primary,
    marginTop: 20,
    width: 140,
    minHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10,
    elevation: 16,
  },
});

export default Home;
