/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { sizeMen, sizeWomen, sizeKids, sizeSale } from "../../constants";
import { useState } from "react";
import { Toast } from "../components/Toast";
import { useBag } from "../context/useBag";

export const ShoeDetail = () => {
  const [size, setSize] = useState(null);
  const [sizeMessage, setSizeMessage] = useState(false);
  const [toast, setToast] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const { bag, setBag } = useBag();
  const location = useLocation();
  const { name, price, image, description, category, originalPrice } =
    location.state || [];

  const sizes = {
    men: sizeMen,
    women: sizeWomen,
    kids: sizeKids,
    sale: sizeSale,
  };

  let sizeKey = location.pathname.split("/")[1];

  const getSize = (s) => {
    if (s !== size) {
      setSize(s);
      setSizeMessage(false);
    } else {
      setSize(null);
    }
  };

  const buttonClick = () => {
    if (size !== null) {
      setToast(true);
      // set bag
      const newBag = [...bag, { name, image, price, size, category }];

      if (newBag.length < 19) {
        setBag(newBag);
        localStorage.setItem("bag", JSON.stringify(newBag));
      }
      setTimeout(() => {
        setFadeOut(true);
      }, 2500);
      setTimeout(() => {
        setSize(null);
        setToast(false);
        setFadeOut(false);
      }, 3000);
    } else setSizeMessage(true);
  };

  return (
    <>
      <Navbar bag={bag} />
      <div className="flex justify-center max-[1300px]:items-center font-poppins pt-12 min-[1200px]:mx-[200px] min-[1300px]:mx-0 flex-wrap">
        <img
          src={image}
          className="w-screen h-[350px] min-[500px]:h-[450px] min-[768px]:w-[550px] min-[768px]:h-[400px] min-[900px]:w-[700px] min-[900px]:h-[500px] min-[1300px]:h-auto min-[1300px]:w-[600px] min-[2000px]:w-[750px] rounded-lg object-cover min-[1300px]:object-contain"
        />
        <div className="min-[1300px]:pl-12 max-[768px]:w-screen w-[500px] max-[768px]:mx-10 min-[1300px]:w-[600px] min-[2000px]:w-[750px] max-[1300px]:pt-10">
          <p className="text-4xl min-[1750px]:text-5xl min-[2000px]:text-7xl font-bold">
            {name}
          </p>
          <p className="pt-2 min-[1750px]:text-lg min-[2000px]:text-xl pb-6">
            {description}
          </p>
          <span className="text-2xl min-[1750px]:text-3xl min-[2000px]:text-4xl flex">
            <p className="pr-2">{price}</p>{" "}
            <p className="text-gray-400 opacity-75 line-through text-xl flex items-center">
              {originalPrice}
            </p>
          </span>
          <p className="text-green-600 font-semibold mt-1">{originalPrice && ((parseFloat(originalPrice.slice(1) - price.slice(1)) / parseFloat(originalPrice.slice(1))) * 100).toFixed(2) + '% Discount'}</p>
          <div className="text-lg min-[1750px]:text-2xl min-[2000px]:text-3xl font-medium pt-8">
            <p>Pick your size</p>
            {/* <a href="https://www.nike.com/size-fit/mens-footwear" target="_blank" className="opacity-50">Size Guide</a> */}
            <div
              className={`flex flex-wrap min-[1750px]:mt-3 ${
                toast ? "select-none pointer-events-none" : ""
              }`}
            >
              {sizes[sizeKey].map((s) => (
                <p
                  key={s}
                  className={`border rounded-lg transition-all duration-200 ${
                    size === s
                      ? " border-gray-400 shadow-sm"
                      : "border-gray-200"
                  } py-2 mt-2 mb-1 text-lg min-[1750px]:text-xl min-[2000px]:text-2xl min-[2200px]:text-[27px] min-[2200px]:leading-9 mr-3 w-[65px] min-[1750px]:w-[75px] min-[2000px]:w-[90px] text-center cursor-pointer select-none`}
                  onClick={() => getSize(s)}
                >
                  {s}
                </p>
              ))}
            </div>
            {sizeMessage && (
              <p className="text-red-500 pt-2 text-sm min-[900px]:text-base">
                Please select a size
              </p>
            )}
          </div>
          <button
            onClick={() => buttonClick()}
            className="bg-black text-white min-[900px]:text-lg min-[1750px]:text-2xl mt-10 w-screen flex justify-center items-center max-[768px]:-mx-10 max-[768px]:h-[75px] min-[768px]:w-[500px] p-5 min-[768px]:rounded-full text-center min-[768px]:mb-5 min-[1300px]:mb-0"
            disabled={toast}
          >
            Add to Bag
          </button>

          {/* <div className="mt-5 text-lg">
            <p>Benefits:</p>
            <ul className="list-disc">{benefits.map((s) => <li key={s}>{s}</li>)}</ul>
            <p className="mt-2">Characteristics:</p>
            <ul className="list-disc">{characteristics.map((s) => <li key={s}>{s}</li>)}</ul>
          </div> */}
        </div>
      </div>
      {toast && (
        <div className="max-[1300px]:relative max-[1300px]:max-h-screen">
          <Toast
            name={name}
            size={size}
            price={price}
            image={image}
            fadeout={fadeOut}
          />
        </div>
      )}
    </>
  );
};
