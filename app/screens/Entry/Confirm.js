import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";
import { colors } from "../../constants/theme";
import mime from "mime";
import firebase from "firebase";
import "firebase/auth";
import { TextInput } from "react-native-gesture-handler";

const Confirm = (props) => {
  const imageUri = props.route.params.imagePath;

  const [vehicleId, setVehicleId] = useState("");
  const [extractError, setExtractError] = useState("");
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [records, setRecords] = useState({});

  const loadRecords = async () => {
    setLoadingRecords(true);
    try {
      const db = firebase.database();
      let ref = db.ref("/Vehicles");
      
      ref.on("value", (snapshot) => {
        console.log(snapshot.val());
      });

      setLoadingRecords(false);
    } catch (error) {
      setLoadError(error.message);
    }
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
      const response = await axios.post(URL, formData);

      setVehicleId(response.data);
      loadRecords();
    } catch (e) {
      setExtractError("Cannot extract");
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
          (records?.length > 0 ? (
            <View>
              <Text>{records.driverName}</Text>
            </View>
          ) : (
            <View>
              <Text>Vehicle Plate Not Registered</Text>
            </View>
          ))}
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
