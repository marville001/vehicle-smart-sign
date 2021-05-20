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
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

const AddVehicle = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View
        style={{
          paddingTop: 30,
          justifyContent: "center",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 25,
              color: colors.primary,
              textAlign: "center",
            }}
          >
            New Record
          </Text>
        </View>
        <View style={styles.form}>
          <ScrollView
            style={{ paddingBottom: 150 }}
            scrollIndicatorInsets={false}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number Plate</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Driver Name</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Driver ID</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Model</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Make</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Vehicle Color</Text>
              <TextInput
                style={styles.input}
                placeholder=">"
                placeholderTextColor={colors.primary}
              />
            </View>
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Button title="Add" />
            </View>
            <View style={{height:50}}>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  form: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    borderColor: colors.primary,
    borderRadius: 5,
    color: colors.primary,
    fontSize: 15,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    color: colors.accent,
  },
});

export default AddVehicle;
