import React from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/theme";
import { Ionicons, Feather as Icon } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  React.useEffect(() => {
    StatusBar.setBackgroundColor(colors.secondary);
    // StatusBar.setTranslucent(true);
    // StatusBar.setHidden(true);
  }, []);

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={openMenu}>
          <Ionicons name="md-menu" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerText}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.welcomeText}>to</Text>
        <Text style={styles.welcomeText}>SmartSign</Text>
      </View>
      <View style={styles.indicatorContainer}>
        <View style={styles.indicatorContent}>
            <Icon name="arrow-down" size={30}/>
        </View>
      </View>
      <View style={styles.buttons}>
      <TouchableOpacity style={styles.entryButton} onPress={() => navigation.navigate("Camera", {action:"Entry"})}>
          <Text style={styles.buttonText}>Entry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.entryButton, styles.exitButton]} onPress={() => navigation.navigate("Camera", {action:"Exit"})}>
          <Text style={styles.buttonText}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  header: {
    // marginTop: StatusBar.currentHeight,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },

  icon: {
    position: "absolute",
    left: 30,
    top: 15,
  },
  headerText: {
    marginHorizontal: 30,
    alignItems:"center"

  },
  welcomeText: {
    fontSize: 40,
    color: colors.primary,
    fontWeight: "bold",
  },
  buttons:{
      paddingHorizontal:30,
      position:"absolute",
      left:0,
      right:0,
      bottom:30
  },
  entryButton:{
      backgroundColor: colors.accent,
      paddingVertical:20,
      alignItems: "center",
      borderRadius:10,
      marginVertical:10
  },
  exitButton:{
    backgroundColor: colors.secondaryLight
  },
  buttonText:{
      fontSize:16,
      fontWeight:"500",
      color: colors.primary
  },indicatorContainer:{
      alignItems:"center",
      marginTop: 100,
      shadowRadius:10, 
      shadowColor: "#eee",
      shadowOpacity: 0.4,
      shadowOffset: {height: 10}
  },
  indicatorContent:{
      width: 50,
      height: 50,
      borderRadius: 100,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent:"center"

  }
});

export default Home;
