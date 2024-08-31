/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useLiked } from "../context/useLiked";
import { ShoeCard } from "../components/ShoeCard";

export const Liked = () => {
  const { liked } = useLiked();
  const [quantity, setQuantity] = useState(10);
  const [buttonVisibility, setButtonVisibility] = useState(true);

  useEffect(() => {
    if (quantity < liked.length) {
      setButtonVisibility(true);
    } else {
      setButtonVisibility(false);
    }
  }, [quantity]);
  const seeMore = () => {
    setQuantity((prev) => prev + 5);
  };
  
  return (
    <>
      <div>
        <Navbar theme="dark" />
      </div>

      <section className="mx-[50px] min-[1300px]:mx-[75px] text-black max-[768px]:pt-5">
        <div className="mb-[50px] mt-5">
          <p className="font-poppins text-5xl font-bold">Liked</p>
          <hr className="border-[#bbb] mt-5" />
        </div>

        <div
          id="shoes"
          className="grid gap-x-12 min-[1750px]:gap-x-24 grid-cols-1 min-[600px]:grid-cols-2 min-[800px]:grid-cols-3 min-[1200px]:grid-cols-4 min-[1750px]:grid-cols-4 min-[1750px]:mr-[100px]"
        >
          {liked.length > 0 ? (
            liked
              .map((s, index) => (
                <ShoeCard
                  key={index}
                  name={s.name}
                  price={s.price}
                  originalPrice={s?.originalPrice}
                  description={s.description}
                  image={s.image}
                  benefits={s.benefits}
                  characteristics={s.characteristics}
                  category={s.category}
                />
              ))
              .slice(0, quantity)
          ) : (
            <p className="text-xl -mt-5 min-[400px]:w-[300px]">
              You have not liked any shoe.
            </p>
          )}
        </div>

        {buttonVisibility && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => seeMore()}
              className="w-[200px] min-[1700px]:w-[250px] min-[1700px]:py-4 text-2xl min-[1700px]:text-3xl bg-black text-white rounded-lg p-3 flex justify-center items-center"
            >
              See more
              <svg
                className="size-[24px] min-[1700px]:size-[36px] ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
