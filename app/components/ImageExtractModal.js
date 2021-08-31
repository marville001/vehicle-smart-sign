import React, { useState } from "react";
import {
  Modal,
  Portal,
  IconButton,
  ActivityIndicator,
  Colors, Text,
  Button,
} from "react-native-paper";
// import * fs from "fs"
import { StyleSheet, Dimensions, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import mime from "mime"
import { colors } from "../constants/theme";

const deviceHeight = Dimensions.get("window").height;

const ImageExtractModal = ({ image, visible, hideModal }) => {
  const [loading, setLoading] = useState(false);
  const [plate, setPlate] = useState("");

  const handleExtract = async () => {

    const newImageUri = "file:///" + image.split("file:/").join("");

    const formData = new FormData();
    formData.append('image', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop()
    });
    try {
      setLoading(true)
      const response = await axios.post("https://smartsign001.herokuapp.com/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // console.log(response.data);
      console.log(response.data.replace(/\s+/g, ""))
      setPlate(response.data.replace(/\s+/g, ""))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }

  };

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <MaterialIcons
          onPress={()=>{
            setPlate("")
            hideModal()
          }}
          name="cancel"
          size={24}
          color="black"
        />

        {image && (
          <>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.img} />
              {loading && (
                <ActivityIndicator
                  style={styles.loading}
                  size="large"
                  animating={true}
                  color={Colors.red800}
                />
              )}
            </View>
            <Button
              icon="camera"
              mode="contained"
              onPress={handleExtract}
            >
              Extract
            </Button>
          </>
        )}
        {plate !== "" && (
        <View>
          <View style={styles.pExtractedContainer}>
            <Text style={{color:"#fff"}}>Plate Extracted </Text><Text style={styles.plateText}>{plate}</Text>
          </View>

          <View>
            <Text style={{color:"#000000", fontWeight:"900",fontSize:16, borderBottomColor:"#eee", borderBottomWidth:2}}>User Details</Text>
            <Text style={{color:"#000000", fontWeight:"900",fontSize:14}}>Name : </Text>
            <Text style={{color:"#000000", fontWeight:"900",fontSize:14}}>ID : </Text>
            <Text style={{color:"#000000", fontWeight:"900",fontSize:14}}>Type : </Text>
            <ActivityIndicator
                  // style={styles.loading}
                  size="small"
                  animating={true}
                  color={Colors.red800}
            />

            <TouchableOpacity style={{backgroundColor:colors.accent, alignItems:"center", paddingVertical:8, borderRadius:10}}>
              <Text>Sign In </Text>
            </TouchableOpacity>

          </View>
        </View>
        )}
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#fff",
    minHeight: deviceHeight / 1.5,
    margin: 20,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "30%",
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 2,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  loading: {
    position: "absolute",
  },
  pExtractedContainer:{
    backgroundColor: colors.secondaryLight,
    marginVertical:20,
    paddingVertical:10,
    paddingHorizontal:30,
    borderRadius:10,
    flexDirection: "row"
  },
  plateText:{
    color:colors.accent,
    fontWeight:"bold",
    fontSize:16
  }
});

export default ImageExtractModal;
