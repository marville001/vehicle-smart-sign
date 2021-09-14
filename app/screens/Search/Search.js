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
import { DataTable, Provider } from 'react-native-paper';

import { colors } from "../../constants/theme";
import { db } from "../../../firebase";
import Loading from "../../components/Loading";
import VehicleDetailsModal from "../../components/VehicleDetailsModal";

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
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false)
    // setSelected({})
  };


  const [snapshots, loading, error] = useList(db.ref("Vehicles"));

  const vehicles = [];
  snapshots.forEach((v) => {
    const { plate, color, make, model, driverName, driverID, type, status } = v.val();
    vehicles.push({ plate, color, make, model, driverName, driverID, type, status });
  });

  const filteredVehicles = vehicles.filter((v) =>
    v.plate.includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  const rowClick = (plate) => {
    const vd = vehicles.filter(v => v.plate === plate)[0];
    console.log(vd);
    setSelected(vd)
    showModal();
  }

  return (
    <Provider>
      <View style={styles.container}>

        <VehicleDetailsModal selected={selected} visible={visible} hideModal={hideModal} />
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
          style={{ marginVertical: 20 }}
        >
          {filteredVehicles.length > 0 ? (
            <View style={styles.tableContainer}>
              <DataTable style={styles.table}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title ><Text style={styles.tableHeaderTitle}>Plate</Text></DataTable.Title>
                  <DataTable.Title ><Text style={styles.tableHeaderTitle}>D. Name</Text></DataTable.Title>
                  <DataTable.Title ><Text style={styles.tableHeaderTitle}>D. ID</Text></DataTable.Title>
                  <DataTable.Title ><Text style={styles.tableHeaderTitle}>Type</Text></DataTable.Title>
                </DataTable.Header>
                {filteredVehicles.map(({ plate, color, driverName, model, make, driverID, type }) => (
                  <DataTable.Row style={styles.tableRow} onPress={() => rowClick(plate)}>
                    <DataTable.Cell><Text style={styles.tableRowContent}>{plate}</Text></DataTable.Cell>
                    <DataTable.Cell ><Text style={styles.tableRowContent}>{driverName}</Text></DataTable.Cell>
                    <DataTable.Cell ><Text style={styles.tableRowContent}>{driverID}</Text></DataTable.Cell>
                    <DataTable.Cell ><Text style={styles.tableRowContent}>{type}</Text></DataTable.Cell>
                  </DataTable.Row>
                )
                )
                }


              </DataTable>
            </View>

          ) : (
            <Text
              style={{ fontSize: 30, color: colors.primary, textAlign: "center" }}
            >
              No vehicle found
            </Text>
          )}
        </ScrollView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    flex: 1,
    paddingTop: 20
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
    marginLeft: 25,
  },
  filterContainer: {
    width: 50,
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    marginTop: 10,
    marginHorizontal: 25
  },
  tableHeaderTitle: {
    color: colors.accent,
    fontSize: 13
  },
  tableHeader: {
  },
  tableRowContent: {
    fontSize: 13,
    color: "#fff",
    textAlign: "center",
  }
});

export default Search;
