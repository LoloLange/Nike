import { useEffect, useState } from "react";
import { navbar } from "../../constants";

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
            {links.map((link) => (
              <li
                key={link.replace(" ", "-")}
                className="hover:text-[#CCC] hover:brightness-90 transition-all"
                onClick={() => setIsClicked(false)}
              >
                <button className="text-[25px] mb-8">{link}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <img
        className="w-8 -translate-y-1 cursor-pointer select-none"
        src={navbar.svg}
        alt="Shopping bag icon"
      />
    </div>
  );
};
