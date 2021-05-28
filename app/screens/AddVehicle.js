import { DrawerView } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

const AddVehicle = ({ navigation }) => {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [make, setMake] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverID, setDriverID] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const unsetError = () => {
    setTimeout(() => {
      setError("");
    }, 1000);
  };

  const validateInputs = () => {
    let isValid = false;

    if (
      plate == "" ||
      model == "" ||
      color == "" ||
      make == "" ||
      driverName == "" ||
      driverID == ""
    ) {
      setIsValid(false);
      setError("All fields are required!");
      unsetError();
    } else if (plate.length != 7) {
      setIsValid(false);
      setError("Invalid Number Plate.. should be 7 characters");
      unsetError();
    } else {
      unsetError();
      setIsValid(true);
    }
  };

  const handleAddVehicle = () => {
    validateInputs();

    if(isValid){
      resetInputs()
    }
   
  };

  const resetInputs = ()=>{
    setPlate("")
    setModel("")
    setMake("")
    setColor("")
    setDriverID("")
    setDriverName("")
  }

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "Ok", onPress: () => {} }]);
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              color: colors.primary,
              textAlign: "center",
            }}
          >
            New Record
          </Text>
        </View>
        <View style={styles.form}>
          <ScrollView
            style={{ paddingBottom: 150 }}
            scrollIndicatorInsets={false}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number Plate (7 characters)</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
                onChangeText={(text) => setPlate(text)}
                value={plate}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Model</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
                onChangeText={(text) => setModel(text)}
                value={model}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Make</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
                onChangeText={(text) => setMake(text)}
                value={make}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Color</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
                onChangeText={(text) => setColor(text)}
                value={color}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Driver Name</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
                onChangeText={(text) => setPlate(setDriverName)}
                value={driverName}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Driver ID</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
                onChangeText={(text) => setDriverID(text)}
                value={driverID}
              />
            </View>

            <View
              style={{
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleAddVehicle}
                style={styles.addBtn}
              >
                <Text style={{ color: "#fff", fontSize: 20 }}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 50 }}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  form: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderColor: colors.primary,
    borderRadius: 5,
    color: colors.primary,
    fontSize: 17,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    color: colors.accent,
  },
  addBtn: {
    backgroundColor: colors.accent,
    // height:50,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default AddVehicle;
