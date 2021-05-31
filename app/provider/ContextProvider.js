import React, { createContext, useState, useEffect } from "react";
const MyContext = createContext();

import firebase from "firebase";
import "firebase/auth";

const ContextProvider = ({ children }) => {
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const [msg, setMsg] = useState("");

  const update = (callback, mess) => {
    callback(mess);
    setTimeout(() => {
      callback("");
    }, 2000);
  };

  const addVehicleSubmit = async (details) => {
    setAddLoading(true);
    const plate = details.plate;
    try {
      const db = firebase.database();
      let ref = db.ref("/Vehicles");

      ref.once("value", (snapshot) => {
        var plates = [];

        snapshot.forEach((snap) => {
          let data = snap.val();

          plates.push(data.plate);
        });
        if (plates.includes(plate)) {
          update(setAddError, "This number plate is already registered.!");
        } else {
          ref.push(details);
          update(setMsg, "Added successfully");
        }
      });

      setAddLoading(false);
    } catch (error) {
      update(setAddError,"Failed add. Try again later");
      setAddLoading(false);
    }
  };

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
