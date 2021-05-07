import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../constants/theme";
import { Feather as Icon } from "@expo/vector-icons";
import axios from "axios";

const Confirm = ({ navigation, route }) => {
  const url = route.params.photoUrl;

  React.useEffect(() => {
    StatusBar.setBackgroundColor(colors.secondary);
  }, []);

  const extractPlate = async () => {
    try {
      const data = await axios.get("http://0.0.0.0:5000");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("Home")}
        >
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm</Text>
      </View>
      <View>
        <Image source={{ uri: url }} style={styles.image} resizeMode="cover" />
      </View>
      <View style={{ paddingVertical: 20 }}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => extractPlate()}
        >
          <Text
            style={{ fontSize: 20, color: colors.primary, fontWeight: "600" }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.result}>
        <Text style={{ textAlign: "center" }}>Result</Text>
        <Text
          style={{
            textAlign: "center",
            color: colors.accent,
            paddingVertical: 10,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          XDS-QQQ-RR
        </Text>
      </View>
      <View
        style={{
          paddingVertical: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: colors.secondaryLight,
            justifyContent: "center",
            padding: 10,
            alignItems: "center",
            width: 150,
          }}
          onPress={() => {}}
        >
          <Text
            style={{ fontSize: 20, color: colors.primary, fontWeight: "600" }}
          >
            Wrong
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: colors.accent,
            justifyContent: "center",
            padding: 10,
            alignItems: "center",
            width: 150,
          }}
          onPress={() => {}}
        >
          <Text
            style={{ fontSize: 20, color: colors.primary, fontWeight: "600" }}
          >
            Correct
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Please enter correct plate</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  header: {
    // marginTop: StatusBar.currentHeight,
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "800",
    marginLeft: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  submitBtn: {
    backgroundColor: colors.accent,
    justifyContent: "center",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  result: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

export default Confirm;
