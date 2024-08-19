/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { navbar } from "../../constants";
import { Link } from "react-router-dom";

export const DesktopNavbar = ({ theme }) => {
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
    <section className={`font-poppins flex justify-between items-center text-center px-12 min-[1000px]:px-16 h-28 ${theme === 'white' ? "text-white" : "text-black"}  font-semibold mt-5`}>
      <img src={navbar.logo} className={`h-8 min-[1000px]:h-10 select-none ${theme === "white" ? '' : 'invert'}`} alt="Nike Logo" />
      <ul
        className="flex justify-evenly min-[1000px]:justify-around"
        style={{ width: navbar.links.length * navbarLinksLength() }}
      >
        {navbar.links.map((l) => (
            <li key={l.name} className={`text-[17.5px] min-[1000px]:text-[20px] min-[2000px]:text-[24px] ${theme === 'white' ? 'hover:border-b-white' : 'hover:border-b-black'} border-b-2 border-transparent hover:brightness-90 transition-all duration-500 cursor-pointer`}>
              <Link to={l.link}>{l.name}</Link>
            </li>
        ))}
      </ul>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme === 'white' ? '#FFF' : '#000'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag max-w-8 min-[1000px]:w-9 -translate-y-2 cursor-pointer select-none"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
        <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
      </svg>
    </section>
  );
};
