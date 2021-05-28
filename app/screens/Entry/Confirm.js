import axios from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { colors } from "../../constants/theme";

const Confirm = (props) => {
  const imageUri = props.route.params.imagePath;
  console.log("Image: ", imageUri);

  const [vehicleId, setVehicleId] = useState("");

  async function confirmHandler() {
    // const { manifest } = Constants;
    // const apiuri = `http://${manifest.debuggerHost.split(':').shift()}:2040` + '/anpr';
    // console.log(apiuri)

    let match = /\.(\w+)$/.exec(imageUri.split("/").pop());
    let type = match ? `image/${match[1]}` : `image`;

    console.log(type);

    let formData = new FormData();
    formData.append("image", {
      uri : imageUri,
      type,
      name: imageUri.split("/").pop()
     });

    console.log("Extracting... ");

    try {
      const response = await axios.post(
        "http://192.168.137.101:2040/anpr",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      // const responseJson = await response.json();
      console.log(response);
      setVehicleId(response["vechileId"]);
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