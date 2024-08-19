/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Navbar } from "./Navbar";
import { ShoeCard } from "../components/ShoeCard";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

export const Shoes = ({ json }) => {
  const [quantity, setQuantity] = useState(10);
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const location = useLocation()

  useEffect(() => {
    if (quantity < json.length) {
      setButtonVisibility(true);
    } else {
      setButtonVisibility(false);
    }
  }, [quantity]);

  const seeMore = () => {
    setQuantity((prev) => prev + 5);
  };

  const shoesName = location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2);

  return (
    <>
      <div>
        <Navbar theme="dark" />
      </div>

      <section className="mx-[50px] min-[1300px]:mx-[75px] text-black">
        <div className="mb-[50px] mt-5">
          <p className="font-poppins text-5xl font-bold">{shoesName}</p>
          <hr className="border-[#bbb] mt-5" />
        </div>

        <div
          id="shoes"
          className="grid gap-x-12 min-[1750px]:gap-x-24 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-[600px]:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] min-[800px]:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] min-[1200px]:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-[1750px]:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-[2200px]:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] min-[1750px]:mr-[100px]"
        >
          {json
            .map((s) => <ShoeCard key={s.id} name={s.name} price={s.price} />)
            .slice(0, quantity)}
        </div>

        {buttonVisibility && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => seeMore()}
              className="w-[200px] text-2xl bg-black text-white rounded-lg p-3 flex justify-center items-center"
            >
              See more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M15 16l4 -4" />
                <path d="M15 8l4 4" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </>
  );
};
