import { DrawerView } from "@react-navigation/drawer";
import React, { useContext, useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/theme";
import MyContext from "../provider/ContextProvider";

const AddVehicle = ({ navigation }) => {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [make, setMake] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverID, setDriverID] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

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
    } else if (plate.length < 7) {
      setIsValid(false);
      setError("Invalid Number Plate.. should be 7 characters");
      unsetError();
    } else {
      unsetError();
      setIsValid(true);
    }
  };

  const addVehicleSubmit = async (details) => {
    setAddLoading(true);
    const plate = details.plate;
    try {
      const db = firebase.database();
      let ref = db.ref("/Vehicles");

      ref.once("value", (snapshot) => {
        var plates = [];

        snapshot.forEach((snap) => {
          let data = snap.val();

          plates.push(data.plate);
        });
        if (plates.includes(plate)) {
          update(setAddError, "This number plate is already registered.!");
        } else {
          ref.push(details);
          Alert.alert("Success", "Added successfully"[{ text: "Ok" }]);
        }
      });

      setAddLoading(false);
    } catch (error) {
      update(setAddError, "Failed add. Try again later");
      setAddLoading(false);
    }
  };

  const handleAddVehicle = () => {
    validateInputs();

    if (isValid) {
      setAddError("");
      addVehicleSubmit({
        plate: plate.toLowerCase(),
        model: model.toLowerCase(),
        make: make.toLowerCase(),
        color: color.toLowerCase(),
        driverName: driverName.toLowerCase(),
        driverID: driverID.toLowerCase(),
      });
      if (msg.length > 0) {
        Alert.alert("Success", msg, [{ text: "Ok", onPress: () => {} }]);
        resetInputs();
      }
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

  useEffect(() => {
    if (error) Alert.alert("Error", error, [{ text: "Ok", onPress: () => {} }]);
  }, [error]);

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
      {loading && (
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
