import React, { createContext, useState, useEffect } from "react";
import { db } from "../../firebase";


const MyContext = createContext();

const ContextProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  const searchVehicleByPlate = async(plates, p)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        // console.log(plates);
        plates.forEach((v) => {
          const { plate } = v.val();
          if(plate===p) return resolve(v.val());
        });

        reject("No plate found")
      }, 1000)
    })
  }

  
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
      value={{  vehicles , searchVehicleByPlate, setVehicles}}
    >
      {children}
    </MyContext.Provider>
  );
};

export { ContextProvider };
export default MyContext;
