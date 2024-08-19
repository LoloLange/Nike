import { useEffect, useState } from "react";
import { navbar } from "../../constants";
import { Link } from "react-router-dom";

export const MobileNavbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { links } = navbar;

  useEffect(() => {
    if(isClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [isClicked])

  return (
    <div className="z-50 font-poppins flex justify-between items-center text-center px-12 h-20 text-white font-semibold pt-5">
      <div className="row cf flex">
        <div className="three col">
          <div
            className={`hamburger ${isClicked ? "is-active" : ""}`}
            id="hamburger-1"
            onClick={() => setIsClicked(!isClicked)}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
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
      <img
        className="w-9 -translate-y-2 cursor-pointer select-none"
        src={navbar.svg}
        alt="Shopping bag icon"
      />
    </div>
  );
};
