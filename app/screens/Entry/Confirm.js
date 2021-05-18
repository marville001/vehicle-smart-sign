import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const Confirm = (props) => {
  const selectedImagePath = props.navigation.getParam("photoUrl");

  const [vehicleId, setVehicleId] = useState("");

  async function confirmHandler() {
    let filename = selectedImagePath.split("/").pop();
    // const { manifest } = Constants;
    // const apiuri = `http://${manifest.debuggerHost.split(':').shift()}:2040` + '/anpr';
    // console.log(apiuri)

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("image", {
      uri: selectedImagePath,
      name: filename,
      type,
    });

    console.log("Extracting... ");

    try {
      const response = await fetch("http://172.16.59.107:2040/anpr", {
        method: "POST",
        body: formData,
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      setVehicleId(responseJson["vechileId"]);
    } catch (error) {
      console.log(error);
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
        <Image source={{ uri: selectedImagePath }} style={styles.image} />
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
