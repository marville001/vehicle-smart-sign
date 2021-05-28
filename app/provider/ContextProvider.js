import React, { createContext, useState, useEffect } from "react";
const MyContext = createContext();

import firebase from "firebase";
import "firebase/auth";

const ContextProvider = ({ children }) => {
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [msg, setMsg] = useState("");

  const addVehicleSubmit = async (details) => {
    setAddLoading(true);
    try {
      const db = firebase.database();
      let ref = db.ref("/Vehicles");
      await ref.push(details);

      
      setAddLoading(false);
      setMsg("Added successfully");
    } catch (error) {
        console.log("An error", error);
      if (error.code == "auth/user-not-found") {
        setAddError("Invalid email or Password");
      } else {
        setAddError("Failed to login. Try again later");
      }
      setAddLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{ addVehicleSubmit, addError, addLoading,setAddError ,msg}}>
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider };
export default MyContext;
