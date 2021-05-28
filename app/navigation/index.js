import React from "react";
import { AuthProvider } from "../provider/AuthProvider";
import {ContextProvider} from "../provider/ContextProvider";
import Routes from "./routes";

const Providers = () => {
  return (
    <AuthProvider>
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </AuthProvider>
  );
};

export default Providers;
