import React, { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

import firebase from "firebase";
import "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      setIsLoading(false);
    } catch (error) {      
      if(error.code =="auth/user-not-found"){
        setLoginError("Invalid email or Password");
      }else{
        setLoginError("Failed to login. Try again later");
      }
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ handleLogin, loginError, handleLogout, user, setUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
