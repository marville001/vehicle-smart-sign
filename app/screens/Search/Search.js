import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "../../constants/theme";

const Card = ({ plate, dname, status, model, make, date }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={{ fontSize: 30 }}>{plate}</Text>
        <View style={styles.box}></View>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 20 }}>{dname}</Text>
        <View>
          <Text style={{ fontSize: 20, color: colors.accent }}>
            Status : {status}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.6)" }}>
          {(model, "", make)}
        </Text>
        <View>
          <Text style={{ fontSize: 16, color: "rgba(0,0,0,0.6)" }}>
            Lastly: {date}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Search = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput style={styles.input} placeholder="Search" />
      </View>
      <View style={styles.cardsContainer}>
      <Card
          plate="KCCBBB4"
          dname="Martin Mwangi"
          status="OUT"
          model="Harrier"
          make="Toyota"
          date="Today"
        /><Card
        plate="KCCBBB4"
        dname="Martin Mwangi"
        status="OUT"
        model="Harrier"
        make="Toyota"
        date="Today"
      />
      </View>
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
    backgroundColor: "red",
    height: 25,
    width: 30,
  },
});

export default Search;
