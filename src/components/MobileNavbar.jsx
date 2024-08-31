/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { navbar } from "../../constants";
import { Link } from "react-router-dom";

export const MobileNavbar = ({ theme, bag }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { links } = navbar;

  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isClicked]);

  return (
    <div className="z-50 font-poppins flex justify-between items-center text-center px-12 h-20 text-white font-semibold pt-5">
      <div className="row cf flex">
        <div className="three col">
          <div
            className={`hamburger ${isClicked ? "is-active" : ""}`}
            id="hamburger-1"
            onClick={() => setIsClicked(!isClicked)}
          >
            <span
              className={`line ${
                isClicked
                  ? "bg-[#FFF]"
                  : theme === "white"
                  ? "bg-[#FFF]"
                  : "bg-[#000]"
              }`}
            ></span>
            <span
              className={`line ${
                isClicked
                  ? "bg-[#FFF]"
                  : theme === "white"
                  ? "bg-[#FFF]"
                  : "bg-[#000]"
              }`}
            ></span>
            <span
              className={`line ${
                isClicked
                  ? "bg-[#FFF]"
                  : theme === "white"
                  ? "bg-[#FFF]"
                  : "bg-[#000]"
              }`}
            ></span>
          </div>
        </div>
      </div>

      {isClicked && (
        <div className="w-screen h-screen bg-black absolute top-0 left-0 overflow-y-hidden flex justify-center items-center flex-col text-center z-40 select-none">
          <img
            src={navbar.logo}
            className="w-24 select-none pb-14"
            alt="Nike Logo"
          />
          <ul className="flex justify-center items-center flex-col text-white">
            {links.map((l) => (
              <li
                key={l.name}
                className="hover:text-[#CCC] hover:brightness-90 transition-all mb-8 text-[25px]"
                onClick={() => setIsClicked(false)}
              >
                <Link to={l.link}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex">
      <Link to={"/liked"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={theme === "white" ? "#FFF" : "#000"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-heart w-9 cursor-pointer select-none mr-3"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
        </Link>

        <Link to={"/bag"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme === "white" ? "#FFF" : "#000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag w-9 cursor-pointer select-none"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
            <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
          </svg>

          {bag.length > 0 && (
            <p
              className={`absolute translate-x-[18px] -translate-y-4 flex justify-center items-center size-[20px] text-[13px]  rounded-full ${
                theme === "white"
                  ? "text-gray-500 bg-white"
                  : "text-white bg-black"
              }`}
            >
              {bag.length}
            </p>
          )}
        </Link>
      </div>
    </div>
  );
};
