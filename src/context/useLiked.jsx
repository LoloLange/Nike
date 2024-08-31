/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

export const LikedContext = createContext();

export const LikedProvider = ({ children }) => {
  const [liked, setLiked] = useState(JSON.parse(localStorage.getItem("liked")) || []);

  useEffect(() => {
    const handleStorageChange = () => {
      setLiked(JSON.parse(localStorage.getItem("liked")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const checkIfLiked = (name, image, price, category, description, originalPrice) => {
    return liked.some(
      (item) =>
        item.name === name &&
        item.image === image &&
        item.price === price &&
        item.category === category &&
        item.description === description &&
        item.originalPrice === originalPrice
    );
  };

  const likedClick = (name, image, price, category, description, originalPrice) => {
    const existingItem = checkIfLiked(name, image, price, category, description, originalPrice);

    let newLiked;
    if (existingItem) {
      // Si el artículo ya está en 'liked', lo eliminamos
      newLiked = liked.filter(
        (item) =>
          item.name !== name ||
          item.image !== image ||
          item.price !== price ||
          item.category !== category ||
          item.description !== description ||
          item.originalPrice !== originalPrice
      );
    } else {
      // Si el artículo no está en 'liked', lo agregamos
      newLiked = [
        ...liked,
        { name, image, price, category, description, originalPrice },
      ];
    }

    setLiked(newLiked);
    localStorage.setItem("liked", JSON.stringify(newLiked));
  };

  return (
    <LikedContext.Provider value={{ liked, setLiked, likedClick, checkIfLiked }}>
      {children}
    </LikedContext.Provider>
  );
};

export const useLiked = () => {
  return useContext(LikedContext);
};
