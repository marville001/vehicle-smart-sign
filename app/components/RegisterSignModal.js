import React, { useContext, useState } from "react";
import {
  Modal,
  Portal
} from "react-native-paper";
import { StyleSheet, Dimensions, Alert, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../../firebase";
import AuthContext from "../provider/AuthProvider";

const deviceHeight = Dimensions.get("window").height;

const RegisterSignModal = ({ plate, rsVisible, hideRSModal}) => {
  const [vehicle, setVehicle] = useState({});
  
  const { user } = useContext(AuthContext)
  const signInVehicle = () => {
    setLoadingSignIn(true);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const by = user.email;

    vehicle.by = by;
    vehicle.status = "in";
    vehicle.date = `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`;

    try {
      db.ref("SignedVehicles").push(vehicle);
      Alert.alert("Success", "Signed in successfully");
      // setPlate("")
      setVehicle({})
      hideModal();
    } catch (error) {
      Alert.alert("Error", error);
    }
    setLoadingSignIn(false);

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
        <View>
          <Text>{plate}</Text>
        </View>
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
    alignItems: "center",
  },
});

export default RegisterSignModal;
