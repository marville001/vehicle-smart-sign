import React, { useContext, useEffect } from "react";

import { View, StyleSheet, Image, TouchableOpacity, Button, Text, StatusBar } from "react-native";
import { db } from "../../firebase";
import { colors } from "../constants/theme";
import AuthContext from "../provider/AuthProvider";

const Profile = () => {
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const getUser = async () => {
      try {
        let userRef = db.ref('users/' + user?.uid);
        console.log(userRef);
        await userRef.once('value', (snap)=>{
          console.log(snap.val());
        });

        
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
  },[user])
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Martin Mwangi</Text>
          <Text style={styles.info}>UX Designer / Mobile developer</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>{user?.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>{user.uid}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.secondary,
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: '600',
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    width: 300,
    borderRadius: 20,
    backgroundColor: "#00BFFF",
  },
});

export default Profile;
