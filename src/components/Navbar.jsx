/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { navbar } from "../../constants";

export const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, [window.innerWidth]);

  const navbarLinksLength = () => {
    if (width < 2000) {
      return 125;
    } else if (width > 2000) {
      return 170;
    }
  };

  return (
    <section className="font-poppins flex justify-between items-center text-center px-12 min-[1000px]:px-16 h-28 text-white font-semibold pt-5">
      <img src={navbar.logo} className="h-8 min-[1000px]:h-10 select-none" alt="Nike Logo" />
      <div
        className="flex justify-evenly min-[1000px]:justify-around"
        style={{ width: navbar.links.length * navbarLinksLength() }}
      >
        {navbar.links.map((l) => (
          <ul key={l}>
            <li className="text-[17.5px] min-[1000px]:text-[20px] min-[2000px]:text-[24px] hover:border-b-white border-b-2 border-transparent hover:brightness-90 transition-all duration-300 cursor-pointer">
              <a>{l}</a>
            </li>
          </ul>
        ))}
      </div>
      <img
        className="min-w-7 min-[1000px]:w-8 -translate-y-1 cursor-pointer select-none"
        src={navbar.svg}
        alt="Shopping bag icon"
      />
    </section>
  );
};
