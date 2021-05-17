import React from "react";

import { View, StyleSheet, Button, Text, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { colors } from "../constants/theme";
import { Feather as Icon } from "@expo/vector-icons";

const AddVehicle = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View>
          <Text>Add Vehicle Record</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
});

export default AddVehicle;
