import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { colors } from "../constants/theme";
import { Camera } from "expo-camera";

const ImageSelector = (props) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setStatus(status === "granted"?"granted":"not");
    })();
  }, [status]);

  const buttonPressHandler = async (buttonType) => {
    let selectedImage;

    const imageProperties = {
      allowsEditing: true,
      aspect: [4, 3],
    };

    if (buttonType === "camera") {
      if (status !== "granted") {
        Alert.alert(
          "Insufficient privilege",
          "Permission required to access camera",
          [{ text: "Ok" }]
        );
        return;
      } else {
        selectedImage = await ImagePicker.launchCameraAsync(imageProperties);
      }
    } else {
      const resultMedia =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!resultMedia) {
        Alert.alert(
          "Insufficient privilege",
          "Permission required to photo roll",
          [{ text: "Ok" }]
        );
        return;
      } else {
        selectedImage = await ImagePicker.launchImageLibraryAsync(
          imageProperties
        );
      }
    }

    if (selectedImage.cancelled) {
      return;
    }
    props.onSelect(selectedImage.uri);
  };

  return (
    <View>
      <View style={styles.buttonView}>
        <Button
          title="Take Picture"
          onPress={() => buttonPressHandler("camera")}
          color={colors.accent}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="Select Picture"
          onPress={() => buttonPressHandler("camera_roll")}
          color={colors.secondary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    margin: 10,
  },
});

export default ImageSelector;
