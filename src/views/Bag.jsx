import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { sizes } from "../../constants";

export const Bag = () => {
  const [bag, setBag] = useState(JSON.parse(localStorage.getItem("bag")) || []);
  const [subtotal, setSubtotal] = useState();

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

  useEffect(() => {
    const newSubtotal = bag.reduce(
      (acc, item) => acc + parseFloat(item.price.slice(1)),
      0
    );
    setSubtotal(newSubtotal.toFixed(2));
  }, [bag]);

  const taxes = (subtotal * 0.21).toFixed(2)

  return (
    <div>
      <Navbar />
      <div className="mb-[50px] mt-5 mx-[50px] min-[1300px]:mx-[75px] text-black max-[768px]:pt-5">
        <p className="font-poppins text-5xl font-bold">Cart</p>
        <hr className="border-[#bbb] mt-5" />
      </div>

      <div className="flex justify-center min-[850px]:justify-between min-[800px]:pr-[75px] text-2xl min-[1300px]:pr-[150px] min-[700px]:pl-5 flex-wrap">
        <div>
          {bag.length > 0 ? (
            bag.map((b, index) => (
              <div
                key={index}
                className="flex justify-between pb-8 items-center"
              >
                <div className="flex ml-2 min-[700px]:ml-8 min-[1100px]:ml-16 max-[800px]:pr-0 max-[850px]:pr-10">
                  <img
                    className="size-[170px] min-[450px]:size-[200px] object-cover rounded-xl select-none"
                    src={b.image}
                    alt={b.name}
                  />
                  <div className="flex flex-col px-5 text-base min-[500px]:text-lg min-[768px]:text-xl pt-2">
                    <p>{b.name}</p>
                    <p>Price: {b.price}</p>

                    <label htmlFor={`size-${index}`} className="pt-2">
                      Size:
                    </label>
                    <select
                      id={`size-${index}`}
                      value={b.size || ""}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      className="p-1 border rounded outline-none border-gray-200"
                    >
                      {sizes.map((size, i) => (
                        <option key={i} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>

                    <div className="flex items-center mr-5 min-[1100px]:mr-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ee6b6e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag-x size-[33px] mt-3 cursor-pointer"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M13 21h-4.426a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304h11.339a2 2 0 0 1 1.977 2.304l-.506 3.287" />
                      <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                      <path d="M22 22l-5 -5" />
                      <path d="M17 22l5 -5" />
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
            <p className="text-center text-xl pl-14">The bag is empty.</p>
          )}
        </div>

        <div className="w-[320px] min-[1000px]:w-[400px] min-[1300px]:w-[500px] max-[850px]:pt-5">
          <div className="flex justify-between items-center text-xl min-[1000px]:text-2xl min-[1300px]:text-3xl border-gray-100 pb-1 border-b-2 mb-5">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between items-center text-xl min-[1000px]:text-2xl min-[1300px]:text-3xl border-gray-100 pb-1 border-b-2 mb-7 text-2xl min-[1300px]:mb-10">
            <p>Estimated taxes</p>
            <p>${taxes}</p>
          </div>
          <div className="flex justify-between items-center text-xl min-[1000px]:text-2xl min-[1300px]:text-3xl border-gray-100 pb-1 border-b-2 font-bold">
            <p>Total</p>
            <p>${(parseFloat(subtotal) + parseFloat(taxes)).toFixed(2)}</p>
          </div>

          <div className="text-lg min-[1000px]:text-xl min-[1300px]:text-2xl bg-black text-white rounded-full text-center p-2.5 min-[1000px]:p-3 mt-7 min-[1000px]:mt-10 cursor-pointer max-[850px]:mb-5">
            <p>Checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
};
