"use client";
import { createContext, useState } from "react";

export const MainContext = createContext();

// eslint-disable-next-line react/prop-types
export function MainProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const value = {
    userData,
    setUserData,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}
