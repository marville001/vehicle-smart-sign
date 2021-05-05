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

const Confirm = ({ navigation, route }) => {
  const url = route.params.photoUrl;

  React.useEffect(() => {
    StatusBar.setBackgroundColor(colors.secondary);
    // StatusBar.setTranslucent(true);
    // StatusBar.setHidden(true);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.icon} onPress={()=>{}}>
            <Icon name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Confirm</Text>
        </View>
      <View>
        <Image
          source={{ uri: url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={{padding:20}}>
        <TouchableOpacity style={styles.submitBtn} onPress={()=>{}}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    paddingHorizontal:20,
    overflow:"hidden"
  },
  header: {
    width:"100%",
    height: 60,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
  },
  headerText: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "800",
    marginLeft:50,
  },
  icon:{
    width: 30,
    height:30
  },
  image:{
    width: "100%",
    height:250,
    resizeMode:"contain",
  },
  submitBtn:{
    backgroundColor:colors.accent,
  }
});

export default Confirm;
