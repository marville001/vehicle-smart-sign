import React, { useContext } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Contact from "../scenes/Contact";
import AuthContext from "./AuthProvider";
import CameraStack from "./CameraStack/CameraStack";

const CustomDrawercontent = (props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.drawerHeader}>
        <View>
          <Text style={styles.drawerHeaderText}>Drawer Menu</Text>
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          // icon={}
          label="Close Drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          // icon={}
          label="Logout"
          onPress={() => props.logout()}
        />
      </DrawerContentScrollView>
    </ScrollView>
  );
};

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <>
      <Drawer.Navigator
        backBehavior="history"
        drawerContent={(props) => (
          <CustomDrawercontent logout={handleLogout} {...props} />
        )}
      >
        <Drawer.Screen name="Home" component={CameraStack} />
        <Drawer.Screen name="Contact" component={Contact} />
      </Drawer.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: "#03cafc",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default AppDrawer;
