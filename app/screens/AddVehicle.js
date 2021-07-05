import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Form, FormItem, Label } from "react-native-form-component";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../constants/theme";

import { useList } from "react-firebase-hooks/database";
import { db } from "../../firebase";

const FormInputItem = ({ text, value, place, action }) => {
  return (
    <>
      <Label style={styles.label} text={text} />
      <FormItem
        style={styles.formInput}
        isRequired
        value={value}
        placeholder={place}
        onChangeText={(plate) => action(plate)}
      />
    </>
  );
};

const AddVehicle = ({ navigation }) => {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [make, setMake] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverID, setDriverID] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [addLoading, setAddLoading] = useState(false);

  const [snapshots, loading, error] = useList(db.ref("Vehicles"));

  const plates = [];
  snapshots.forEach((snap) => {
    let data = snap.val();
    plates.push(data.plate);
  });

  const validateInputs = () => {
    console.log(plates);
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
      Alert.alert("Input Error", "All fields are required!");
    } else if (plate.length < 7) {
      setIsValid(false);
      Alert.alert(
        "Input Error",
        "Invalid Number Plate.. should be 7 characters"
      );
    } else {
      setIsValid(true);
    }
  };

  const addVehicleSubmit = async (details) => {
    setAddLoading(true);
    try {

        if (plates.includes(details.plate)) {
          Alert.alert("Record exists", "This number plate is already registered.!");
        } else {
          db.ref("Vehicles").push(details);
          Alert.alert("Success", "Added successfully");
          resetInputs()
        }

      setAddLoading(false);
    } catch (error) {
      Alert.alert("Error", "Failed add. Try again later");
      setAddLoading(false);
    }
  };

  const handleAddVehicle = () => {
    validateInputs();

    if (isValid) {
      addVehicleSubmit({
        plate: plate.toLowerCase(),
        model: model.toLowerCase(),
        make: make.toLowerCase(),
        color: color.toLowerCase(),
        driverName: driverName.toLowerCase(),
        driverID: driverID.toLowerCase(),
      });
    }
  };

  const resetInputs = () => {
    setPlate("");
    setModel("");
    setMake("");
    setColor("");
    setDriverID("");
    setDriverName("");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: colors.secondary,
          marginBottom: 20,
        }}
      >
        Add Vehicle
      </Text>
      {addLoading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Adding...</Text>
          <ActivityIndicator color={colors.accent} />
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Form
          onButtonPress={handleAddVehicle}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
        >
          <FormInputItem
            place="Enter plate"
            value={plate}
            action={setPlate}
            text="Plate Number"
          />

          <FormInputItem
            place="Enter model"
            value={model}
            action={setModel}
            text="Vehicle Model"
          />

          <FormInputItem
            place="Enter color"
            value={color}
            action={setColor}
            text="Vehicle Color"
          />

          <FormInputItem
            place="Enter make"
            value={make}
            action={setMake}
            text="Vehicle Make"
          />

          <FormInputItem
            place="Enter driver name"
            value={driverName}
            action={setDriverName}
            text="Driver Name"
          />

          <FormInputItem
            place="Enter driver ID"
            value={driverID}
            action={setDriverID}
            text="Driver ID"
          />
        </Form>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 50,
  },
  label: {
    color: colors.secondaryLight,
    fontSize: 15,
  },
  formInput: {
    // backgroundColor:"red",
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: colors.secondaryLight,
  },
  buttonTextStyle: {
    color: colors.primary,
    fontSize: 20,
  },
  loading: {
    // marginVertical: 10,
    position: "absolute",
    right: 20,
    top: 30,
    flexDirection: "row",
  },
  loadingText: {
    color: colors.accent,
    marginRight: 5,
  },
});

export default AddVehicle;
