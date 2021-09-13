import React, { useContext, useState } from "react";
import {
  Modal,
  Portal,
  IconButton,
  ActivityIndicator,
  Colors, Text,
  Button,
} from "react-native-paper";
// import * fs from "fs"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import mime from "mime"
import { colors } from "../constants/theme";
import { useList } from "react-firebase-hooks/database";
import { db } from "../../firebase";
import MyContext from "../provider/ContextProvider";
import AuthContext from "../provider/AuthProvider";

const deviceHeight = Dimensions.get("window").height;

const ImageExtractModal = ({ image, visible, hideModal, showRSModal}) => {
  const [loading, setLoading] = useState(false);
  const [plate, setPlate] = useState("");

  let [snapshots, ..._] = useList(db.ref("Vehicles"));
  const { searchVehicleByPlate } = useContext(MyContext);


  const [loadPlate, setLoadPlate] = useState(false);
  const [vehicle, setVehicle] = useState({});
  const [vehicleError, setVehicleError] = useState("");
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const vehicles = [];
  // snapshots.forEach((v) => {
  //   const { plate, color, make, model, driverName, driverID, type } = v.val();
  //   vehicles.push({ plate, color, make, model, driverName, driverID, type });
  // });

  const loadVehicle = async () => {
    setLoadPlate(true);
    setVehicleError("")
    console.log("loading....");
    console.log({ plate: plate.replace("'", "") });
    try {
      let v = await searchVehicleByPlate(snapshots, plate.replace("'", "").toLowerCase());
      setVehicle(v)
    } catch (error) {
      setVehicle({})
      setVehicleError(error)
    }

    setLoadPlate(false);
  }

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
      setPlate("")
      setVehicle({})
      hideModal();
    } catch (error) {
      Alert.alert("Error", error);
    }
    setLoadingSignIn(false);

  };


  const handleExtract = async () => {
    setPlate("");
    const newImageUri = "file:///" + image.split("file:/").join("");

    const formData = new FormData();
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });
    try {
      setLoading(true)
      const response = await axios.post("https://smartsign001.herokuapp.com/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const refinedPlate = response.data.replace(/\s+/g, "").replace("'", "")
      
      setPlate(refinedPlate)
      setLoading(false)
      loadVehicle();
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <MaterialIcons
          onPress={() => {
            setPlate("")
            hideModal()
          }}
          name="cancel"
          size={24}
          color="black"
        />

        {image && (
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.img} />
              {loading && (
                <ActivityIndicator
                  style={styles.loading}
                  size="large"
                  animating={true}
                  color={Colors.red800}
                />
              )}
            </View>
            <Button
              icon="camera"
              mode="contained"
              onPress={handleExtract}
            >
              Extract
            </Button>
          </>
        )}
        {plate !== "" && (
          <View>
            <View style={styles.pExtractedContainer}>
              <Text style={{ color: "#fff" }}>Plate Extracted </Text><Text style={styles.plateText}>{plate}</Text>
            </View>

            <View>
              <TouchableOpacity onPress={()=>loadVehicle()}>
                <Text style={{
                  color: "#000000",
                  fontWeight: "900",
                  fontSize: 16,
                  borderBottomColor: "#eee",
                  borderBottomWidth: 2
                }}>Driver Details</Text>
              </TouchableOpacity>
              {loadPlate ?
                <ActivityIndicator
                  // style={styles.loading}
                  size="small"
                  animating={true}
                  color={Colors.red800} /> :

                vehicleError ?
                  <View>
                    <Text style={{textAlign: "center", fontSize: 20, marginVertical: 15}}>{vehicleError}</Text>
                    <TouchableOpacity style={{
                      backgroundColor: colors.accent,
                      alignItems: "center",
                      paddingVertical: 8,
                      borderRadius: 10,
                      marginTop: 10
                    }}
                      onPress={() =>showRSModal(plate)}
                    >
                      <Text style={{color:"#fff", fontSize:20}}>Register and Sign In</Text>
                    </TouchableOpacity>
                  </View>

                  :
                  <>
                    <Text style={{ color: "#000000", fontWeight: "900", fontSize: 14 }}>Name :
                      <Text style={styles.detText}> {vehicle?.driverName}</Text>
                    </Text>
                    <Text style={{ color: "#000000", fontWeight: "900", fontSize: 14 }}>ID :
                      <Text style={styles.detText}> {vehicle?.driverID}</Text>
                    </Text>
                    <Text style={{ color: "#000000", fontWeight: "900", fontSize: 14 }}>Type :
                      <Text style={styles.detText}> {vehicle?.type || "Visitor"}</Text>
                    </Text>
                    <TouchableOpacity style={{
                      backgroundColor: colors.accent,
                      alignItems: "center",
                      paddingVertical: 8,
                      borderRadius: 10,
                      marginTop: 10
                    }}
                      onPress={signInVehicle}
                    >
                      <Text style={{color:"#fff", fontSize:20}}>{loadingSignIn ? "Loading..." : " Sign In"}</Text>
                    </TouchableOpacity>
                  </>
              }
            </View>
          </View>
        )}
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
  imageContainer: {
    width: "100%",
    height: "30%",
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  loading: {
    position: "absolute",
  },
  pExtractedContainer: {
    backgroundColor: colors.secondaryLight,
    marginVertical: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    flexDirection: "row"
  },
  plateText: {
    color: colors.accent,
    fontWeight: "bold",
    fontSize: 16
  },
  detText: {
    paddingLeft: 20,
    color: colors.accent,
    fontSize: 15
  }
});

export default ImageExtractModal;
