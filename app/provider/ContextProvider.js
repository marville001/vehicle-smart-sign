import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firebase";

const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  
  const update = (callback, mess) => {
    callback(mess);
    setTimeout(() => {
      callback("");
    }, 2000);
  };
  
  useEffect(()=>{
    const getVehicles = async ()=>{
    }
    return getVehicles;
  },[])

  return (
    <MyContext.Provider
      value={{  vehicles }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider };
export default MyContext;
