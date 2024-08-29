/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { colors } from "../../constants";
import { sizes } from "../../constants";
import { jordanDescription } from "../../constants";
import { colorsHex } from "../../constants";
import { Toast } from "./Toast";

export const Hero = ({ activeColor, setActiveColor }) => {
  const [size, setSize] = useState(null);
  const [toast, setToast] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [sizeMessage, setSizeMessage] = useState(false);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  const getSize = (s) => {
    if (s !== size) {
      setSize(s);
      setSizeMessage(false);
    } else {
      setSize(null);
    }
  };

  const handleColorChange = (color) => {
    if (color[0] !== activeColor[0]) {
      setActiveColor(color);
      if (imageRef.current) {
        imageRef.current.classList.remove("animate-slide-in-right");
        void imageRef.current.offsetWidth; // Trigger reflow
        imageRef.current.classList.add("animate-slide-in-right");
      }
    }
  };

  const buttonClick = () => {
    if (size !== null) {
      setToast(true);
      
      // set bag
      const bag = JSON.parse(localStorage.getItem("bag")) || [];
      bag.push({ name: 'JORDAN 1 MID ' + colors[activeColor[2]].color_text, image: colors[activeColor[2]].shoe, price: '$125', size: size });
      localStorage.setItem("bag", JSON.stringify(bag));
      setTimeout(() => {
        setFadeOut(true);
      }, 2500)
      setTimeout(() => {
        setSize(null);
        setToast(false);
        setFadeOut(false);
      }, 3000);
    } else setSizeMessage(true);
  };

  return (
    <>
      <main className="max-[1650px]:flex max-[1650px]:justify-between max-[1200px]:justify-between max-[1100px]:justify-center max-[1100px]:flex-wrap">
        <div className="flex justify-center items-center min-[1100px]:order-1 max-[1100px]:w-[800px] max-[1000px]:w-[600px] max-[1650px]:w-[800px] max-[1100px]:h-[200px] max-[1100px]:mt-[200px] max-[700px]:mt-[150px] max-[400px]:mt-[100px] min-[1101px]:mr-[400px] min-[1200px]:mr-[400px] min-[1400px]:mr-[300px] min-[1650px]:mr-0">
          <div className="flex justify-center absolute -z-10 min-[1651px]:-top-0 items-center min-[1651px]:min-h-screen min-[1651px]:w-screen min-[1100px]:mr-28 min-[1200px]:mr-0">
            <p
              ref={textRef}
              className="font-thunder text-[200px] min-[300px]:text-[245px] min-[400px]:text-[280px] min-[500px]:text-[320px] min-[600px]:text-[380px] min-[700px]:text-[420px] min-[1300px]:text-[490px] min-[1950px]:text-[575px] min-[2000px]:text-[600px] min-[2500px]:text-[675px] duration-300 animate-fade-in text-white z-10 tracking-[5px] select-none"
            >
              NIKE
            </p>
            <img
              ref={imageRef}
              src={colors[activeColor[2]].shoe}
              className="scale-150 absolute w-[200px] min-[300px]:w-[230px] min-[400px]:w-[280px] min-[600px]:w-[330px] min-[700px]:w-[370px] min-[1300px]:w-[400px] min-[1650px]:w-[500px] min-[1950px]:w-[500px] min-[2000px]:w-[600px] min-[2500px]:w-[675px] z-20 pointer-events-none animate-slide-in-right animate-duration-1000 select-none"
              alt="Jordan 1 Mid Red Nike Shoe"
            />
          </div>
        </div>

        <section className="flex max-[1100px]:justify-start max-[1000px]:mt-16 max-[600px]:w-[450px] max-[700px]:w-[500px] max-[600px]:w-[430px] max-[500px]:w-[360px] max-[400px]:w-[300px]">
          <div className="min-[1000px]:pl-16 min-[2200px]:pl-20 min-[2500px]:pl-28 text-white flex flex-col justify-end mt-2 min-[600px]:mt-14 min-[600px]:mt-24 min-[1000px]:mt-40 min-[1100px]:mt-0">
            <div className="animate-slide-in-bottom duration-700">
              <p className="text-[30px] min-[400px]:text-[36px] min-[500px]:text-[40px] min-[2000px]:text-[55px] min-[2200px]:text-[60px] min-[2500px]:text-[65px] font-bold max-[1100px]:w-[800px] max-[1000px]:w-[500px] max-[600px]:w-[450px] max-[500px]:w-[360px] max-[400px]:w-[300px] w-fit">
                JORDAN 1 MID {colors[activeColor[2]].color_text}
              </p>
              <p className="text-xs min-[600px]:text-sm min-[2000px]:text-base min-[2200px]:text-[18px] min-[2200px]:leading-7 mt-2 text-gray-200 w-[300px] min-[400px]:w-[360px] min-[500px]:w-[430px] min-[600px]:w-[500px] min-[700px]:w-[600px] min-[1000px]:w-[700px] min-[1100px]:w-[400px] min-[1750px]:w-[450px] min-[2200px]:w-[500px]">
                {jordanDescription}
              </p>
              <p className="font-bold text-[28px] min-[500px]:text-3xl min-[2000px]:text-[40px] min-[2200px]:text-[45px] pt-4 min-[2000px]:pt-6 min-[2000px]:pt-8">
                $125
              </p>
            </div>
            <div className="pt-10 min-[2000px]:pt-12 w-[300px] min-[400px]:w-[360px] min-[500px]:w-[450px] min-[600px]:w-[500px] min-[700px]:w-[600px] min-[1000px]:w-[800px] min-[1100px]: animate-fade-in-up animate-duration-[1100ms]">
              <p className="font-bold text-xl min-[400px]:text-2xl min-[2000px]:text-3xl">
                Size (US)
              </p>
              <div className="flex flex-wrap w-[300px] min-[400px]:w-[360px] min-[500px]:w-[450px] min-[600px]:w-[500px] min-[700px]:w-[600px] min-[1000px]:w-[800px] min-[1100px]:w-[450px] min-[2000px]:w-[500px] min-[2000px]:mt-2">
                {sizes.map((s) => (
                  <p
                    key={s}
                    className={`border rounded-sm transition-all duration-200 ${
                      size === s ? "border-white shadow-lg" : "border-gray-400"
                    } py-2 mt-2 mb-1 text-lg min-[1750px]:text-xl min-[2000px]:text-2xl min-[2200px]:text-[27px] min-[2200px]:leading-9 mr-3 w-[65px] min-[1750px]:w-[70px] min-[2000px]:w-[80px] text-center cursor-pointer select-none`}
                    onClick={() => getSize(s)}
                  >
                    {s}
                  </p>
                ))}
              </div>
              {sizeMessage && (
              <p className="text-white pt-2 text-sm min-[900px]:text-base">
                Please select a size
              </p>
            )}
            </div>
            <div className="pt-5 min-[2000px]:pt-8 animate-fade-in-up animate-duration-[1500ms]">
              <p className="font-bold text-xl min-[400px]:text-2xl min-[2000px]:text-3xl">
                Color
              </p>
              <div className="flex justify-between w-[220px] min-[2000px]:w-[260px] pt-2 min-[2000px]:pt-5 min-[2200px]:pt-6">
                {colorsHex.map((c) => (
                  <span
                    key={c.hex}
                    className={`rounded-full border-2 cursor-pointer p-5 ${
                      activeColor[0] === c.hex
                        ? "border-gray-100 shadow-xl scale-105 min-[2000px]:scale-[1.3] min-[2200px]:scale-[1.4] transition-all duration-300"
                        : "border-gray-400 scale-90 min-[2000px]:scale-110 min-[2200px]:scale-[1.2]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() =>
                      handleColorChange([c.hex, c.name, c.position])
                    }
                  ></span>
                ))}
              </div>
              <button onClick={() => buttonClick()} className="p-2 min-[2000px]:py-3 text-xl min-[2000px]:text-3xl w-[300px] min-[400px]:w-[360px] min-[500px]:w-[430px] min-[600px]:w-[500px] min-[700px]:w-[600px] min-[1000px]:w-[700px] min-[1100px]:w-[375px] min-[1750px]:w-[400px] min-[2000px]:w-[450px] min-[2200px]:w-[480px] border-2 text-white mt-9 min-[2000px]:mt-11 font-bold rounded-md shadow-2xl hover:-translate-y-1 transition-all animate-fade-in-up animate-duration-[1800ms]">
                ADD TO BAG
              </button>
            </div>
          </div>
        </section>
        {toast && <Toast name={'JORDAN 1 MID ' + colors[activeColor[2]].color_text} size={size} price={'$125'} image={colors[activeColor[2]].shoe} fadeout={fadeOut} />}
      </main>
    </>
  );
};
