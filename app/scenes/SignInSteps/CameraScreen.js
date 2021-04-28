import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
// import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Capture </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.captureButton, styles.button]}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            {/* <Icon name="rowing" /> */}
            <Ionicons name="camera" size={35} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            {/* <Icon name="rowing" /> */}
            <Ionicons name="cancel" size={35} color="white" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  button: {
    justifyContent: "center",
    alignItems:"center",
    width: 50,
    height: 50,
    backgroundColor: "#eee",
    borderRadius:50
  },
  captureButton: {},
  text: {
    fontSize: 18,
    color: "white",
  },
});

export default CameraScreen;
