import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ActivityIndicator,
  Portal,
  RadioButton
} from "react-native-paper";
import { StyleSheet, Dimensions, Alert, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../../firebase";
import AuthContext from "../provider/AuthProvider";
import { Form, FormItem, Label } from "react-native-form-component";

import { colors } from "../constants/theme";

import { useList } from "react-firebase-hooks/database";

const deviceHeight = Dimensions.get("window").height;

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

const RegisterSignModal = ({ plate, rsVisible, hideRSModal }) => {
  const [vplate, setVPlate] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [make, setMake] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverID, setDriverID] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [type, setType] = useState('visitor');
  const [purpose, setPurpose] = useState("");

  const [addLoading, setAddLoading] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  useEffect(() => {
    setVPlate(plate)
  }, [plate])

  const { user } = useContext(AuthContext)
  const signInVehicle = (details) => {
    setLoadingSignIn(true);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const by = user.email;

    details.by = by;
    details.status = "in";
    details.date = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;

    try {
      db.ref("SignedVehicles").push(details);
      Alert.alert("Success", "Signed in successfully");
      // setPlate("")
      resetInputs();
    } catch (error) {
      Alert.alert("Error", error);
    }
    setLoadingSignIn(false);
  };

  const resetInputs = () => {
    setVPlate("");
    setModel("");
    setMake("");
    setColor("");
    setDriverID("");
    setDriverName("");
  };

  const validateInputs = () => {
    if (
      vplate == "" ||
      model == "" ||
      color == "" ||
      make == "" ||
      driverName == "" ||
      driverID == "" ||
      type === "visitor" && purpose == ""
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

  const handleAddVehicle = async () => {
    validateInputs();
    if (isValid) {
      const details = {
        plate: vplate.toLowerCase(),
        model: model.toLowerCase(),
        make: make.toLowerCase(),
        color: color.toLowerCase(),
        driverName: driverName.toLowerCase(),
        driverID: driverID.toLowerCase(),
        type: type.toLowerCase()
      }
      if (type === "visitor") {
        details.purpose = purpose
      }
      addVehicleSubmit(details);
    }
  };

  const [snapshots, loading, error] = useList(db.ref("Vehicles"));

  const plates = [];
  snapshots.forEach((snap) => {
    let data = snap.val();
    plates.push(data.plate);
  });

  const addVehicleSubmit = async (details) => {
    setAddLoading(true);
    const { purpose } = details;
    delete details.purpose;
    try {
      if (plates.includes(details.plate)) {
        Alert.alert(
          "Record exists",
          "This number plate is already registered.!"
        );
      } else {
        details.purpose = purpose;
        db.ref("Vehicles").push(details);
        signInVehicle(details);
      }

      setAddLoading(false);
    } catch (error) {
      Alert.alert("Error", "Failed add. Try again later");
      setAddLoading(false);
    }

  };

  return (
    <Portal>
      <Modal
        visible={rsVisible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <MaterialIcons
          onPress={() => {
            hideRSModal()
          }}
          name="cancel"
          size={24}
          color="black"
        />
        {addLoading && (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Adding...</Text>
            <ActivityIndicator color={colors.accent} />
          </View>
        )}

        {loadingSignIn && (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Signing vehicle...</Text>
            <ActivityIndicator color={colors.accent} />
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form
            // onButtonPress={handleAddVehicle}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
          >
            <View style={styles.detHead}>
              <Text style={styles.det}>Driver Details</Text>
            </View>
            <RadioButton.Group
              onValueChange={newValue => setType(newValue)}
              value={type}
            >
              <View style={styles.radioGroup}>
                <View style={styles.radio}>
                  <RadioButton value="visitor" />
                  <Text>Visitor</Text>
                </View>
                <View style={[styles.radio, { marginLeft: 20 }]}>
                  <RadioButton value="staff" />
                  <Text>Staff</Text>
                </View>
              </View>
            </RadioButton.Group>
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

            {type === "visitor" && <FormInputItem
              place="Enter purpose"
              value={purpose}
              action={setPurpose}
              text="Purpose of visit"
            />}


            <View style={styles.detHead}>
              <Text style={styles.det}>Vehicle Details</Text>
            </View>

            <FormInputItem
              place="Enter plate"
              value={vplate}
              action={setVPlate}
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
          </Form>
          <TouchableOpacity style={{
            backgroundColor: colors.accent,
            alignItems: "center",
            paddingVertical: 8,
            borderRadius: 10,
            marginVertical: 10
          }}
            onPress={handleAddVehicle}
          >
            <Text style={{ color: "#fff", fontSize: 20 }}>Register and Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    minHeight: deviceHeight / 1.5,
    margin: 20,
    padding: 10,
    justifyContent: "flex-start",
  },
  label: {
    color: colors.secondaryLight,
    fontSize: 15,
  },
  formInput: {
    fontSize: 20,
  },
  buttonStyle: {
    backgroundColor: colors.secondaryLight,
    display: "none"
  },
  buttonTextStyle: {
    color: colors.primary,
    fontSize: 20,
  },
  loading: {
    position: "absolute",
    right: 20,
    top: 30,
    flexDirection: "row",
  },
  loadingText: {
    color: colors.accent,
    marginRight: 5,
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
  },
  detHead: {
    marginVertical: 5
  },
  det: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default RegisterSignModal;
