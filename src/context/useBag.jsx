/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

export const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState(JSON.parse(localStorage.getItem("bag")) || []);
  const [subtotal, setSubtotal] = useState();

  useEffect(() => {
    const handleStorageChange = () => {
      setBag(JSON.parse(localStorage.getItem("bag")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const newSubtotal = bag.reduce(
      (acc, item) => acc + parseFloat(item.price.slice(1)),
      0
    );
    setSubtotal(newSubtotal.toFixed(2));
  }, [bag]);

  const taxes = (subtotal * 0.09).toFixed(2);

  const total = (parseFloat(subtotal) + parseFloat(taxes)).toFixed(2)

  return (
    <BagContext.Provider value={{ bag, setBag, subtotal, taxes, total }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => {
  return useContext(BagContext);
};
