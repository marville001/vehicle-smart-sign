import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constants/theme";
import MyContext from "../../provider/ContextProvider";
import { Feather as Icon } from "@expo/vector-icons";

const Card = ({ plate, dname, vColor, model, make, date }) => {
  const signoutVehicle = () => {
    Alert.alert("Vehicle Sighout", "Do you want to sign out vehicle with id "+plate, [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => alert("Signed out") },
    ]);
  };
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={{ fontSize: 30 }}>Plate: {plate}</Text>
        <View style={[styles.box, { backgroundColor: vColor }]}></View>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>Driver: {dname}</Text>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.6)" }}>
          {model + " " + make}
        </Text>
        <TouchableOpacity onPress={signoutVehicle} style={styles.signOutBtn}>
          <Text style={{ fontSize: 17, color: colors.primary }}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Search = () => {
  const [search, setSearch] = useState("");
  const { vehicles, getVehicles } = useContext(MyContext);
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.plate.includes(search.toLowerCase())
  );
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
          placeholder="Search"
        />
      </View>
      <View
        style={{ position: "absolute", right: 20 }}
        onTouchEnd={() => getVehicles()}
      >
        <Icon color={colors.accent} name="refresh-cw" size={25} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.cardsContainer}
      >
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map(
            ({ id, plate, color, driverName, model, make, driverID }) => (
              <Card
                key={id}
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
    height: 50,
    paddingLeft: 20,
    borderRadius: 10,
    fontSize: 20,
  },
  cardsContainer: {
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    height: 25,
    width: 30,
    position: "relative",
  },
  signOutBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
});

export default Search;
