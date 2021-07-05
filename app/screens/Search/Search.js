import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useList } from "react-firebase-hooks/database";
import { Feather as Icon } from "@expo/vector-icons";

import { colors } from "../../constants/theme";
import { db } from "../../../firebase";
import Loading from "../../components/Loading";

const screenWidth = Dimensions.get("window").width;

const Card = ({ plate, dname, vColor, model, make, date }) => {
  const signoutVehicle = () => {
    Alert.alert(
      "Vehicle Sighout",
      "Do you want to sign out vehicle with id " + plate,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => alert("Signed out") },
      ]
    );
  };
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>Plate: {plate}</Text>
        <View style={[styles.box, { backgroundColor: vColor }]}></View>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 16 }}>Driver: {dname}</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 14, color: "rgba(0,0,0,.6)" }}>
          {model + " " + make}
        </Text>
        <TouchableOpacity onPress={signoutVehicle} style={styles.signOutBtn}>
          <Icon color={colors.primary} name="log-out" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Search = () => {
  const [search, setSearch] = useState("");
  const [snapshots, loading, error] = useList(db.ref("Vehicles"));

  const vehicles = [];
  snapshots.forEach((v) => {
    const { plate, color, make, model, driverName, driverID } = v.val();
    vehicles.push({ plate, color, make, model, driverName, driverID });
  });

  const filteredVehicles = vehicles.filter((v) =>
    v.plate.includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
          placeholder="Search"
        />
        <View style={styles.filterContainer}>
          <Icon color={colors.secondaryLight} name="filter" size={25} />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardsContainer}
      >
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(
            ({ plate, color, driverName, model, make, driverID }) => (
              <Card
                key={plate}
                plate={plate}
                dname={driverName}
                status="OUT"
                model={model}
                make={make}
                vColor={color}
              />
            )
          )
        ) : (
          <Text
            style={{ fontSize: 30, color: colors.primary, textAlign: "center" }}
          >
            No vehicle found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    padding: 30,
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    paddingLeft: 20,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    fontSize: 16,
    width: screenWidth - 110,
  },
  filterContainer: {
    width: 50,
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    height: 110,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    height: 20,
    width: 30,
    position: "relative",
  },
  signOutBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default Search;
