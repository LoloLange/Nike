/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState(JSON.parse(localStorage.getItem("bag")) || []);

  useEffect(() => {
    const handleStorageChange = () => {
      setBag(JSON.parse(localStorage.getItem("bag")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BagContext.Provider value={{ bag, setBag }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  return useContext(BagContext);
};