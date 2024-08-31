/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { sizeMen, sizeWomen, sizeKids, sizeSale } from "../../constants";
import { useBag } from "../context/useBag";

export const Bag = () => {
  const [subtotal, setSubtotal] = useState();
  const { bag, setBag } = useBag();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSizeChange = (index, newSize) => {
    const updatedBag = [...bag];
    updatedBag[index].size = newSize;
    setBag(updatedBag);
    localStorage.setItem("bag", JSON.stringify(updatedBag));
  };

  const handleRemoveItem = (index) => {
    const updatedBag = bag.filter((_, i) => i !== index);
    setBag(updatedBag);
    localStorage.setItem("bag", JSON.stringify(updatedBag));
  };

  const handleCheckout = () => {
    if (bag.length > 0) {
      localStorage.removeItem("bag");
      alert("Your order has been made.");
      window.location.reload();
    }
  };

  const sizes = {
    men: sizeMen,
    women: sizeWomen,
    kids: sizeKids,
    sale: sizeSale,
  };

  useEffect(() => {
    const newSubtotal = bag.reduce(
      (acc, item) => acc + parseFloat(item.price.slice(1)),
      0
    );
    setSubtotal(newSubtotal.toFixed(2));
  }, [bag]);

  const taxes = (subtotal * 0.09).toFixed(2);

  return (
    <div>
      <Navbar />
      <div className="mb-[20px] min-[768px]:mb-[40px] mt-5 mx-[50px] min-[1300px]:mx-[75px] text-black max-[768px]:pt-5">
        <p className="font-poppins text-5xl font-bold">Bag</p>
        <hr className="border-[#bbb] mt-5" />
      </div>

      <div className="flex justify-around min-[700px]:px-[100px] text-2xl min-[1300px]:px-[150px] min-[700px]:px-5 flex-wrap font-poppins mt-5 flex-wrap gap-x-2 min-[800px]:gap-y-5">
        <div>
          {bag.length > 0 ? (
            bag.map((b, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-5"
              >
                <div className="flex items-center ml-2 min-[700px]:ml-8 my-5">
                  <img
                    className="size-[150px] min-[340px]:size-[170px] min-[450px]:size-[200px] object-cover rounded-xl select-none"
                    src={b.image}
                    alt={b.name}
                  />
                  <div className="flex flex-col px-3.5 min-[450px]:px-5 text-xl min-[768px]:text-2xl">
                    <p className="font-bold">{b.name}</p>
                    <p className="text-gray-400 brightness-80 text-sm -mt-1 mb-1">
                      {b.category.slice(0, 1).toUpperCase() +
                        b.category.slice(1)}{" "}
                      shoes
                    </p>
                    {width >= 1100 && (
                      <p className="text-sm max-w-[300px] min-[1200px]:max-w-[400px] mb-1">
                        {b.description}
                      </p>
                    )}

                    <p className="text-sm min-[768px]:text-base mb-2">
                      Size: {b.size}
                    </p>

                    <span className="flex flex-wrap gap-x-2 mb-0.5 min-[450px]:mb-2">
                      <p className="font-semibold">
                        ${parseFloat(b.price.slice(1)).toFixed(2)}
                      </p>
                      {b.originalPrice && (
                        <p className="text-gray-400 opacity-75 line-through text-base min-[768px]:text-lg flex items-center">
                          {b.originalPrice}
                        </p>
                      )}
                    </span>

                    <div className="flex items-center mr-5 min-[1100px]:mr-10 bg-[#ee6b6e] size-[30px] mt-1 rounded-full justify-center cursor-pointer shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        onClick={() => handleRemoveItem(index)}
                        className="icon icon-tabler icons-tabler-outline icon-tabler-x size-[20px] -translate-x-[.5px]"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 6l-12 12" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </div>

                    {/* <label htmlFor={`quantity-${index}`} className="pt-2">
                      Quantity:
                    </label>
                    <select
                      id={`quantity-${index}`}
                      value={b.quantity || 1}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="p-1 border rounded outline-none border-gray-200"
                    >
                      {quantities.map((quantity, i) => (
                        <option key={i} value={quantity}>
                          {quantity}
                        </option>
                      ))}
                    </select> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-xl pl-14 max-[800px]:pb-8 max-[570px]:px-14 max-[800px]:px-[200px] w-[300px] min-[1200px]:w-[400px]">
              The bag is empty.
            </p>
          )}
        </div>

        <div className="w-[270px] min-[400px]:w-[320px] min-[1000px]:w-[400px] min-[1300px]:w-[500px] max-[800px]:pt-5">
          <p className="font-bold text-3xl min-[600px]:text-4xl mb-3 text-center">
            Order Summary
          </p>
          <hr />
          <br />
          <div className="flex justify-between items-center text-lg min-[1000px]:text-xl min-[1300px]:text-2xl border-gray-100 pb-1 border-b-2 mb-5">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between items-center text-base min-[1000px]:text-lg min-[1300px]:text-xl border-gray-100 pb-1 border-b-2 mb-5 min-[1300px]:mb-10">
            <p>Taxes</p>
            <p>${taxes}</p>
          </div>
          <div className="flex justify-between items-center text-lg min-[1000px]:text-xl min-[1300px]:text-2xl border-gray-100 pb-1 border-b-2 font-bold">
            <p>Total</p>
            <p>${(parseFloat(subtotal) + parseFloat(taxes)).toFixed(2)}</p>
          </div>

          <div
            onClick={handleCheckout}
            className={`${
              bag.length > 0 ? "cursor-pointer " : "text-gray-300"
            } text-lg min-[1000px]:text-xl min-[1300px]:text-2xl bg-black text-white rounded-2xl text-center p-2.5 min-[1000px]:p-3 mt-7 min-[1000px]:mt-10 mb-5`}
          >
            <button disabled={bag.length > 0 ? false : true}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};
