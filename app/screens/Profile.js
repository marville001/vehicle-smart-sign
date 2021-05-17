import React from "react";

import { View, StyleSheet, Button, Text, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { colors } from "../constants/theme";
import { Feather as Icon } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Profile is here</Text>
        <Button title="Go Home" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "800",
  },
  button: {},
});

export default Profile;
