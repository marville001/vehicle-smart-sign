import React from "react";
import { Text, View } from "react-native";

const screen2 = () => {
  return (
    <View style={styles.container}>
      <Text>screen2</Text>
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
export default screen2;
