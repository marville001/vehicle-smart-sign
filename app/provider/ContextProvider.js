import React, { createContext, useState, useEffect } from "react";
const MyContext = createContext();

import firebase from "firebase";
import "firebase/auth";

const ContextProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState();

  const update = (callback, mess) => {
    callback(mess);
    setTimeout(() => {
      callback("");
    }, 2000);
  };
  useEffect(()=>{
    const getVehicles = ()=>{
      const db = firebase.database();
      let ref = db.ref("/Vehicles");
      ref.once("value", (snapshot) => {
        var plates = [];

        snapshot.forEach((snap) => {
          let data = snap.val();

          plates.push(data.plate);
        });
        setVehicles(plates)
      })
    }
    return getVehicles;
  },[])

  return (
    <MyContext.Provider
      value={{ addVehicleSubmit, addError, addLoading, setAddError, msg }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider };
export default MyContext;
