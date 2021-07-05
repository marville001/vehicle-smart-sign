import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../constants/theme";
import mime from "mime";
import { TextInput } from "react-native-gesture-handler";

import { useList } from "react-firebase-hooks/database";
import { db } from "../../../firebase";

const Confirm = (props) => {
  const imageUri = props.route.params.imagePath;
  const { navigation } = props;

  const [vehicleId, setVehicleId] = useState("");
  const [extractLoading, setExtractLoading] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [recordsError, setRecordsError] = useState("");
  const [records, setRecords] = useState({});

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const [snapshots, loading, error] = useList(db.ref("Vehicles"));

  const vehicles = [];
  snapshots.forEach((v) => {
    const { plate, color, make, model, driverName, driverID } = v.val();
    vehicles.push({ plate, color, make, model, driverName, driverID });
  });

  const loadRecords = async () => {
    setRecordsError("");
    setLoadingRecords(true);
    try {
      const vdets = vehicles.filter(
        (vehicle) => vehicle.plate.toLowerCase() === vehicleId.toLowerCase()
      );
      if (vdets.length > 0) {
        const { plate, color, make, model, driverName, driverID } = vdets[0];
        setRecords({ plate, color, make, model, driverName, driverID });
      }
    } catch (error) {
      setRecordsError("Could not load");
      console.log(error);
      Alert.alert("Failed", "Please try again..");
    }

    setLoadingRecords(false);
  };

  async function confirmHandler() {
    const newImageUri = "file:///" + imageUri.split("file:/").join("");

    const formData = new FormData();
    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    const URL = "https://smartsign001.herokuapp.com/upload";
    try {
      console.log("Extracting... ");
      setExtractLoading(true);
      const response = await axios.post(URL, formData);

      setVehicleId(response.data.replace(/\s+/g, ""));
      setExtractLoading(false);
      loadRecords();
    } catch (e) {
      setExtractError("Cannot extract");
      setExtractLoading(false);
      console.log(e);
    }
  }

  function SetResult() {
    if (!vehicleId) {
      return <View></View>;
    }
    return (
      <View style={styles.resultView}>
        <Text style={styles.generalText}>
          Vehicle registration number is {"\n"}
        </Text>

        <Text style={styles.resultText}>{vehicleId}</Text>
        {loadingRecords && (
          <Text style={styles.generalText}>Loading record...</Text>
        )}
        {!loadingRecords &&
          !recordsError &&
          (records.plate != undefined ? (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text>Driver name- </Text>
                <Text
                  style={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {records.driverName}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Vehicle Color- </Text>
                <Text
                  style={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {records.color}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Vehicle model- </Text>
                <Text
                  style={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {records.model}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text>Vehicle make- </Text>
                <Text
                  style={{ fontWeight: "bold", textTransform: "capitalize" }}
                >
                  {records.make}
                </Text>
              </View>
              <View style={styles.resultButton}>
                <Button
                  title="Sign In"
                  onPress={signInVehicle}
                  color={colors.accent}
                />
              </View>
              {loadingSignIn && (
                <View style={{ flexDirection: "row" }}>
                  <Text>loading.... </Text>
                  <ActivityIndicator color={colors.accent} />
                </View>
              )}
            </View>
          ) : (
            <View>
              <Text>Vehicle Plate Not Registered</Text>
              <View style={styles.resultButton}>
                <Button
                  title="Register & Sign In"
                  onPress={() => {
                    navigation.navigate("Add Vehicle", {
                      screen: "AddVehicle",
                      params: { vplate: vehicleId },
                    });
                  }}
                  color={colors.accent}
                />
              </View>
            </View>
          ))}
      </View>
    );
  }

  const signInVehicle = () => {
    setLoadingSignIn(true);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    try {
      const { plate, color, make, model, driverName, driverID } = records;
      db.ref("SignedVehicles").push({
        plate,
        color,
        make,
        model,
        driverName,
        driverID,
        date: `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`,
      });
      Alert.alert("Success", "Signed in successfully");
      navigation.navigate("EntryHome");
    } catch (error) {
      Alert.alert("Error", error);
    }
    setLoadingSignIn(false);
  };

  function SetError() {
    if (!extractError) {
      return <View></View>;
    }
    return (
      <View style={[styles.resultView, { justifyContent: "flex-start" }]}>
        <Text style={styles.genehralText}>
          Failed to extract, this could be due to network issues {"\n"}
        </Text>

        <Text style={styles.resultText}>Enter Vehicle Manually</Text>
        <View>
          <TextInput
            style={{
              borderColor: "#ccc",
              borderWidth: 1,
              paddingHorizontal: 10,
              marginTop: 10,
            }}
            placeholder="Enter number plate"
            onChangeText={(text) => setVehicleId(text.toLowerCase())}
          />
        </View>
        <View style={styles.resultButton}>
          <Button
            title="Continue"
            onPress={() => props.navigation.goBack()}
            color={colors.accent}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Cancel"
          onPress={() => props.navigation.goBack()}
          color={colors.accent}
        />

        {extractLoading && <ActivityIndicator color={colors.accent} />}

        <Button
          title="Extract"
          onPress={confirmHandler}
          color={colors.accent}
        />
      </View>
      <SetResult />
      <SetError />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  imageView: {
    width: "90%",
    height: "30%",
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonView: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  resultView: {
    minHeight: "30%",
    width: "90%",
    margin: 30,
    alignItems: "center",
    paddingVertical: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  generalText: {
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  resultButton: {
    marginVertical: 20,
  },
});

export default Confirm;
