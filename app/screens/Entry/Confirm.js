import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { colors } from "../../constants/theme";
import mime from "mime";

const Confirm = (props) => {
  const imageUri = props.route.params.imagePath;

  const [vehicleId, setVehicleId] = useState("");

  async function confirmHandler() {
    // const { manifest } = Constants;
    // const apiuri = `http://${manifest.debuggerHost.split(':').shift()}:2040` + '/anpr';
    // console.log(apiuri)

    // let match = /\.(\w+)$/.exec(imageUri.split("/").pop());
    // let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();

    formData.append("image", {
      image: imageUri,
      type: mime.getType(imageUri),
      name: imageUri.split("/").pop(),
    });

    console.log("Extracting... ");

    fetch("https://smartsign001.herokuapp.com/upload", {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((res) => alert(res))
      .catch(e=>alert(e));
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
        <View style={styles.resultButton}>
          <Button
            title="Return"
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
          title="Confirm"
          onPress={confirmHandler}
          color={colors.accent}
        />
      </View>
      <SetResult />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    margin: 30,
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
    height: "30%",
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
    marginTop: 20,
  },
});

export default Confirm;
