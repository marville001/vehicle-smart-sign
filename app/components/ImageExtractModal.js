import React, { useState } from "react";
import {
  Modal,
  Portal,
  ActivityIndicator,
  Colors,
  Button,
} from "react-native-paper";
// import * fs from "fs"
import { StyleSheet, Dimensions, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import mime from "mime"

const deviceHeight = Dimensions.get("window").height;

const ImageExtractModal = ({ image, visible, hideModal }) => {
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    
    const newImageUri =  "file:/" + image.split("file:/").join("");

    const formData = new FormData();
    formData.append('image', {
      uri : image,
      mineType: 'image/jpeg',
      fileType: 'image/jpg',
      type: mime.getType(newImageUri),
      // type: "multipart/form-data",
      name: newImageUri.split("/").pop()
    });

    // console.log("formdata",formData);
    // console.log("newImageUri",newImageUri);

    try {

      setLoading(true)
      // const response = await axios.post("http://192.168.100.60:5000/upload", formData,{
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      const response = await axios.post("https://smartsign001.herokuapp.com/upload", {data: formData});
      
      console.log(response);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log("Error:", error);
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
          onPress={hideModal}
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
});

export default ImageExtractModal;
