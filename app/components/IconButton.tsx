import { Feather as Icon } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

interface IconButtonProps {
  onPress: () => void;
  icon: string;
  size: number;
  color: string;
}

const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
  return (
    <TouchableWithoutFeedback style={styles.container} {...{ onPress }}>
      <Icon name={icon} size={size} color={color} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container:{
    width :50,
    height:50,
    backgroundColor:"black",
  }
})

IconButton.defaultProps = { size: 26, color: "white" };
export default IconButton;