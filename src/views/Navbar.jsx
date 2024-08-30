/* eslint-disable react/prop-types */
import { MobileNavbar } from "../components/MobileNavbar";
import { DesktopNavbar } from "../components/DesktopNavbar";
import { useEffect, useState } from "react";
import { useBag } from "../context/useBag";

export const Navbar = ({ theme }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const { bag } = useBag()

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return width > 768 ? <DesktopNavbar theme={theme} bag={bag} /> : <MobileNavbar theme={theme} bag={bag} />
}