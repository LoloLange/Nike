import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center pt-[200px] flex-col ">
        <p className="text-xl min-[250px]:text-2xl min-[350px]:text-3xl min-[600px]:text-4xl min-[1300px]:text-5xl">
          Error 404 | Not Found
        </p>
        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/")}
            className="w-[130px] min-[350px]:w-[150px] min-[600px]:w-[200px] text-lg min-[350px]:text-xl min-[600px]:text-2xl bg-black text-white rounded-lg p-3 flex justify-center items-center mt-5 min-[1300px]:mt-10"
          >
            Go back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M15 16l4 -4" />
              <path d="M15 8l4 4" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
