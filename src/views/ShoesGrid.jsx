/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Navbar } from "./Navbar";
import { ShoeCard } from "../components/ShoeCard";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import men from "../json/menshoes.json";
import women from "../json/womenshoes.json";
import kids from "../json/kidsshoes.json";
import sale from "../json/saleshoes.json";
import { NotFound } from "./NotFound";

export const ShoesGrid = () => {
  const [quantity, setQuantity] = useState(10);
  const [buttonVisibility, setButtonVisibility] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (quantity < shoes.length) {
      setButtonVisibility(true);
    } else {
      setButtonVisibility(false);
    }
  }, [quantity]);

  const categories = {
    men,
    women,
    kids,
    sale,
  };

  const { category } = useParams();
  console.log(category);
  const shoes = categories[category] || [];

  if (!categories[category]) {
    return <NotFound />;
  }

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
          <p className="font-poppins text-5xl font-bold">
            {category.charAt(0).toUpperCase() + location.pathname.slice(2)}
          </p>
          <hr className="border-[#bbb] mt-5" />
        </div>

        <div
          id="shoes"
          className="grid gap-x-12 min-[1750px]:gap-x-24 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-[600px]:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] min-[800px]:grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] min-[1200px]:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-[1750px]:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] min-[2200px]:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] min-[1750px]:mr-[100px]"
        >
          {shoes
            .map((s) => <ShoeCard key={s.id} name={s.name} price={s.price} description={s.description} image={s.image} benefits={s.benefits} characteristics={s.characteristics} />)
            .slice(0, quantity)}
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
