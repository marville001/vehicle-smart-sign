import React from "react";
import { Text, View } from "react-native";

const Details = () => {
  return (
    <View style={styles.container}>
      <Text>Details</Text>
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

export default Details;
