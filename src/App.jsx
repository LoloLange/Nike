import "./App.css";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { MobileNavbar } from "./components/MobileNavbar";
import { useEffect, useState } from "react";

function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {width > 768 ? <Navbar /> : <MobileNavbar />}
      <Hero />
    </>
  );
}

export default App;
