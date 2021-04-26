import React from "react";
import { useState } from "react";
import { View } from "react-native";
import DrawerNavigation from "./app/Navigation/DrawerNavigation";
import Login from "./app/scenes/Login";

import * as firebase from 'firebase';
import apiKeys from './app/config/firebaseConfig'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAuthenticationReady, setIsAuthenticationReady] = useState(false);

  if(!firebase.apps.length){
    firebase.initializeApp(apiKeys);
    firebase.auth().onAuthStateChanged(user=>{
        setIsAuthenticationReady(true);
        setIsAuthenticated(!!user);
    })
  }

  return <>{isAuthenticated ? <DrawerNavigation /> : <Login />}</>;
}
