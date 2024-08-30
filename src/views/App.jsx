import { useState } from "react";
import "../App.css";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "./Navbar";
import { useBag } from "../context/useBag";

function App() {
  const [activeColor, setActiveColor] = useState(["#960001", "red", 0]);
  const { bag, setBag } = useBag();

  const bg = () => {
    if (activeColor[1] === "red") {
      return "radial-gradient(circle, #cd8585, #c96b68, #c15049, #b73229, #a90304)";
    } else if (activeColor[1] === "blue") {
      return "radial-gradient(circle, #8aa4ee, #6d8cec, #5073e9, #3259e3, #043ddb)";
    } else if (activeColor[1] === "green") {
      return "radial-gradient(circle, #a8c1af, #8eaf97, #759d80, #5d8b69, #447a52)";
    } else if (activeColor[1] === "brown") {
      return "radial-gradient(circle, #d2b5a0, #c69f83, #ba8a67, #ad744d, #9f5f33)";
    }
  };

  return (
    <>
      <div
        id="background"
        className="absolute top-0 left-0 h-full min-[1650px]:h-full w-full max-[400px]:h-[1200px] max-[700px]:h-[1250px] max-[1100px]:h-[1300px] -z-50"
        style={{
          backgroundImage: bg(),
        }}
      >
        <Navbar theme="white" />
        <Hero activeColor={activeColor} setActiveColor={setActiveColor} bag={bag} setBag={setBag} />
        {/* <Footer /> */}
      </div>
    </>
  );
}

export default App;
