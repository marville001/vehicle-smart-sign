import React from "react";

import {
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../constants/theme";

const AddVehicle = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View
        style={{
          display: "flex",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Add Vehicle Record
        </Text>
      </View>

      <View style={styles.form}>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Model</Text>
            <TextInput style={styles.input} placeholder="Model..." />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Color</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number Plate</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Email</Text>
            <TextInput style={styles.input} placeholder="Email" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  form: {
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: "row"
  },
  inputContainer: {
    marginVertical: 10,width:"50%"
  },
  input: {
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
  },
});

export default AddVehicle;
