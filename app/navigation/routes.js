import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";

import AuthStack from "./AuthStack";
import AppDrawer from "./AppDrawer";
import Loading from "../components/Loading";
import AuthContext from "./AuthProvider";

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <Loading />;

  return (
    <NavigationContainer>
      {user ? <AppDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
