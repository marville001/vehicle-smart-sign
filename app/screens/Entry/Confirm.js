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
