/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLiked } from "../context/useLiked";

export const ShoeCard = ({
  id,
  name,
  description,
  image,
  price,
  color,
  characteristics,
  benefits,
  category,
  originalPrice,
}) => {
  const { likedClick, checkIfLiked } = useLiked();
  const { pathname } = useLocation();

  // Verificar si el artículo está en liked
  const isLiked = checkIfLiked(
    name,
    image,
    price,
    category,
    description,
    originalPrice
  );

  const imageExist = () => {
    return image.slice(0, 1) === "h";
  };

  const defaultImage =
    "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a3e7dead-1ad2-4c40-996d-93ebc9df0fca/dunk-low-retro-mens-shoes-5FQWGR.png";

  return (
    <div className="text-black rounded-lg font-poppins mb-[100px]">
      <div className="flex justify-end">
        <Link
          to={`/${category}/${name.replace(/\s+/g, "-")}`}
          state={{
            name: name,
            price: price,
            image: imageExist() ? image : defaultImage,
            description: description,
            benefits: benefits,
            characteristics: characteristics,
            category: category,
            originalPrice: originalPrice,
          }}
        >
          <img
            className="rounded-xl shadow-lg select-none cursor-pointer w-auto"
            src={imageExist() ? image : defaultImage}
            alt={name}
          />
        </Link>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isLiked ? "#000" : "none"}
          stroke="#121212"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() =>
            likedClick(
              name,
              image,
              price,
              category,
              description,
              originalPrice
            )
          }
          className="icon icon-tabler icons-tabler-outline icon-tabler-heart w-14 -translate-y-1.5 cursor-pointer mt-5 mr-3.5 p-1.5 select-none rounded-full bg-[#ddd] absolute"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      </div>
      <Link
        to={`/${category}/${name.replace(/\s+/g, "-")}`}
        state={{
          name: name,
          price: price,
          image: imageExist() ? image : defaultImage,
          description: description,
          benefits: benefits,
          characteristics: characteristics,
          category: category,
          originalPrice: originalPrice,
        }}
      >
        <p className="font-bold mt-5 min-[1300px]:mt-8 min-[2200px]:mt-10 text-3xl min-[600px]:text-2xl min-[1300px]:text-3xl min-[1750px]:text-3xl min-[2200px]:text-4xl pb-1">
          {name}
        </p>
        {pathname === "/liked" && (
          <p className="text-gray-400 brightness-80 text-sm -mt-1 mb-1">
            {category.slice(0, 1).toUpperCase() + category.slice(1)} shoes
          </p>
        )}
        <span className="text-2xl min-[600px]:text-xl min-[1300px]:text-2xl min-[1750px]:mt-2 min-[1750px]:text-2xl min-[2200px]:text-3xl flex">
          <p className="pr-2">{price}</p>{" "}
          <p className="text-gray-400 opacity-75 line-through text-lg flex items-center">
            {originalPrice}
          </p>
        </span>
        <p className="text-green-600 font-semibold mt-1">
          {originalPrice &&
            (
              (parseFloat(originalPrice.slice(1) - price.slice(1)) /
                parseFloat(originalPrice.slice(1))) *
              100
            ).toFixed(0) + "% Discount"}
        </p>
      </Link>
    </div>
  );
};
