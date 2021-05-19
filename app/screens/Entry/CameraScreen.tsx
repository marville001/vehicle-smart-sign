import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageSelector from "../../components/ImageSelector";

const CameraScreen = (props) => {
  const selectedImageHandler = (imagePath) => {
    props.navigation.navigate("Confirm", {imagePath: imagePath});
  };

  return (
    <View style={styles.container}>
      <View style={styles.textView}>
        <Text style={styles.welcomeText}>
          Welcome to SmartSign{"\n"}
          {"\n"}
          <Text style={styles.actionText}>
            Click a photo or select one{"\n"}
            {"\n"}
          </Text>
          <Text style={styles.actionText}>
            Ensure vechile registration number is well visible
          </Text>
        </Text>
      </View>

      <ImageSelector onSelect={selectedImageHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  textView: {
    marginVertical: 50,
    marginHorizontal: 25,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  actionText: {
    fontSize: 16,
    fontWeight: "normal",
  },
});

export default CameraScreen;
