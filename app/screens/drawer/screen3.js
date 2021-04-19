import React from "react";
import { Text, View } from "react-native";

const screen3 = () => {
  return (
    <View style={styles.container}>
      <Text>screen3</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default screen3;
