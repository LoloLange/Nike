import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export const Toast = ({ name, size, price, image, fadeout }) => {
  const bag = JSON.parse(localStorage.getItem("bag")) || [];
  return name && size && price ? (
    <Link
      to={"/bag"}
      className={`flex items-center rounded-xl shadow-xl select-none fixed bottom-2 right-2 min-[768px]:bottom-5 min-[768px]:right-5 border-gray-100 border-2 animate-fade-in-left bg-white ${
        fadeout && "animate-fade-out-right"
      } z-50`}
    >
      {bag.length < 19 ? (
        <div className="flex items-center">
          <img
            className="size-[100px] min-[500px]:size-[120px] min-[768px]:size-[150px] object-cover rounded-l-xl"
            src={image}
          />
          <div className="flex flex-col px-5 text-base min-[500px]:text-lg min-[768px]:text-xl">
            <p>{name} added to bag</p>
            <p>Size: {size}</p>
            <p>{price}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center rounded-xl shadow-xl select-none w-[250px] min-[400px]:w-[300px] p-5 absolute bottom-5 right-5 border-gray-100 border-2 animate-fade-in-left z-50">
          <p>You have reached the maxium of 19 elements on the bag.</p>
        </div>
      )}
    </Link>
  ) : (
    <div className="flex items-center rounded-xl shadow-xl select-none w-[250px] min-[400px]:w-[300px] p-5 absolute bottom-5 right-5 border-gray-100 border-2 animate-fade-in-left z-50">
      <p>Item could not be added successfully. Please try again.</p>
    </div>
  );
};
