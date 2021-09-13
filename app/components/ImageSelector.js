import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet, Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Provider } from "react-native-paper";

import { colors } from "../constants/theme";
import ImageExtractModal from "./ImageExtractModal";
import RegisterSignModal from "./RegisterSignModal";

const ImageSelector = (props) => {
  const [image, setImage] = useState(null);
  const [plate, setPlate] = useState(null);
  const [visible, setVisible] = React.useState(false);
  const [rsVisible, setRSVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showRSModal = (plate) => {
    setPlate(plate)
    setRSVisible(true);
    hideModal();
  }
  const hideRSModal = () => {
    setPlate(null)
    setRSVisible(false);
  }

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, grant permissions to capture image");
      }
    })();
  }, []);

  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });

    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
      showModal()
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 2],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      showModal()
    }
  };

  return (
    <Provider>
      <ImageExtractModal image={image} visible={visible} showRSModal={showRSModal} hideModal={hideModal} />
      <RegisterSignModal plate={plate} rsVisible={rsVisible} hideRSModal={hideRSModal} />

      <View>
        <View style={styles.buttonView}>
          <Button
            title="Take Picture"
            onPress={() => pickImageFromCamera()}
            color={colors.accent}
          />
        </View>
        <View style={styles.buttonView}>
          <Button
            title="Select Picture"
            onPress={() => pickImageFromGallery()}
            color={colors.secondary}
          />
        </View>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    margin: 10,
  },
});

export default ImageSelector;
