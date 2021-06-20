import axios from "axios";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Form, FormItem, Label } from "react-native-form-component";
import { ActivityIndicator } from "react-native-paper";
import { URL } from "../constants/constants";
import { colors } from "../constants/theme";

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

// const API_PATH = "http://localhost/smartsign/api/save_vehicle.php";
export default function AddVehicle1() {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [make, setMake] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverID, setDriverID] = useState("");

  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    const body = JSON.stringify({
      plate: plate.toLowerCase(),
      model: model.toLowerCase(),
      make: make.toLowerCase(),
      color: color.toLowerCase(),
      driverName: driverName.toLowerCase(),
      driverID: driverID.toLowerCase(),
    });

    axios
      .post(URL+"save_vehicle.php", body, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      })
      .then((res) => {
        const { error, message } = res.data;
        if (error != undefined) Alert.alert(error);
        if (message != undefined) {
          Alert.alert(message);

          setPlate("");
          setMake("");
          setModel("");
          setColor("");
          setDriverName("");
          setDriverID("");
        }
      })
      .catch((e) => console.log(e));
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
      {loading && (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Adding...</Text>
          <ActivityIndicator color={colors.accent} />
        </View>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Form
          onButtonPress={submitForm}
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
}

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
