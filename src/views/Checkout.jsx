/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useBag } from "../context/useBag";
import { useNavigate, useParams } from "react-router-dom";
import paypal from "../assets/Paypal.webp";

export const Checkout = () => {
  const [method, setMethod] = useState("Card");
  const [copy, setCopy] = useState(false);
  const [errors, setErrors] = useState({});
  const [mainValues, setMainValues] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();
  const { bag } = useBag();
  const { id } = useParams();
  const { total } = useBag();

  useEffect(() => {
    if (bag.length === 0) {
      navigate("/bag");
    }
  }, [bag]);

  const handleExpiryInput = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    e.target.value = value;
  };

  const handleCardInput = (e) => {
    let { value } = e.target;
    value = value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4) + " " + value.slice(4);
    }
    if (value.length > 9) {
      value = value.slice(0, 9) + " " + value.slice(9);
    }
    if (value.length > 14) {
      value = value.slice(0, 14) + " " + value.slice(14);
    }
    e.target.value = value;
  };

  const handleAccountNumber = () => {
    navigator.clipboard.writeText("012345678910");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const handleErrors = () => {
    const newErrors = {};

    // Validar los campos
    const name = document.querySelector("input[name='Name']").value;
    const lastName = document.querySelector("input[name='lastName']").value;
    const email = document.querySelector("input[name='Email']").value;
    const cardName = document.querySelector("input[name='cardName']")?.value;
    const cardNumber = document.querySelector(
      "input[name='cardNumber']"
    )?.value;
    const expiryDate = document.querySelector(
      "input[name='expiryDate']"
    )?.value;
    const cvv = document.querySelector("input[name='cvv']")?.value;

    if (method === "Card") {
      if (cardNumber?.length !== 19)
        newErrors.cardNumber = "Enter a valid card number";
      if (!cardName?.includes(" ")) {
        newErrors.cardName = "Enter a valid card name";
      }
      if (expiryDate?.length !== 5)
        newErrors.expiryDate = "Enter a valid expiry date";
      if (cvv?.length !== 3) newErrors.cvv = "Enter a valid CVV";
    }

    if (!email.includes("@") || !email.includes("."))
      newErrors.email = "Enter a valid email";

    if (!name) newErrors.name = "Name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (method === "Card") {
      if (!cardName) newErrors.cardName = "Card name is required";
      if (!cardNumber) newErrors.cardNumber = "Card number is required";
      if (!expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!cvv) newErrors.cvv = "CVV is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const storedId = localStorage.getItem("checkoutId");

    if (storedId !== id) {
      // Redirige al usuario si el ID no es válido
      navigate("/bag");
    } else {
      // Elimina el ID del localStorage después de la verificación
      localStorage.removeItem("checkoutId");
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    handleErrors();
    if (handleErrors()) {
      alert("Your order has been made.");
      localStorage.removeItem("bag");
      location.assign("/");
    }
  };

  const methods = [
    {
      name: "Card",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={`${method === "Card" ? "#60A5FA" : "#B3BAC5"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[38px] min-[550px]:size-[40px] min-[1800px]:size-[45px]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
          <path d="M3 10l18 0" />
          <path d="M7 15l.01 0" />
          <path d="M11 15l2 0" />
        </svg>
      ),
    },
    {
      name: "PayPal",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={`${method === "PayPal" ? "#60A5FA" : "#B3BAC5"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[38px] min-[550px]:size-[40px] min-[1800px]:size-[45px]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 13l2.5 0c2.5 0 5 -2.5 5 -5c0 -3 -1.9 -5 -5 -5h-5.5c-.5 0 -1 .5 -1 1l-2 14c0 .5 .5 1 1 1h2.8l1.2 -5c.1 -.6 .4 -1 1 -1zm7.5 -5.8c1.7 1 2.5 2.8 2.5 4.8c0 2.5 -2.5 4.5 -5 4.5h-2.6l-.6 3.6a1 1 0 0 1 -1 .8l-2.7 0a.5 .5 0 0 1 -.5 -.6l.2 -1.4" />
        </svg>
      ),
    },
    {
      name: "Bank",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke={`${method === "Bank" ? "#60A5FA" : "#B3BAC5"}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-[38px] min-[550px]:size-[40px] min-[1800px]:size-[45px]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 21l18 0" />
          <path d="M3 10l18 0" />
          <path d="M5 6l7 -3l7 3" />
          <path d="M4 10l0 11" />
          <path d="M20 10l0 11" />
          <path d="M8 14l0 3" />
          <path d="M12 14l0 3" />
          <path d="M16 14l0 3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="font-poppins">
      <Navbar />

      <div className="mb-[20px] min-[768px]:mb-[40px] mt-5 mx-[50px] min-[1300px]:mx-[75px] text-black max-[768px]:pt-5">
        <p className="font-poppins text-5xl font-bold">Checkout</p>
        <hr className="border-[#bbb] mt-5" />
      </div>

      <div className="flex flex-col items-center min-[768px]:ml-6 min-[1400px]:ml-10">
        <div className="w-[250px] min-[400px]:w-[300px] min-[550px]:w-[420px] min-[750px]:w-[600px] min-[1800px]:w-[800px]">
          <div className="flex gap-x-2 min-[400px]:gap-x-4 min-[750px]:gap-x-8">
            {methods.map((m) => (
              <div
                key={m.name}
                className={`border-[3px] w-full py-5 pl-2 min-[1800px]:pl-4 rounded-xl text-base min-[550px]:text-lg min-[1800px]:text-xl font-semibold select-none cursor-pointer transition-all mt-3 ${
                  method === m.name
                    ? "border-blue-400 bg-transparent text-blue-400"
                    : "border-gray-200 bg-gray-50 text-[#B3BAC5]"
                }`}
                onClick={() => setMethod(m.name)}
              >
                {m.svg}
                <p>{m.name}</p>
              </div>
            ))}
          </div>
        </div>

        {method !== "PayPal" && (
          <div className="mt-6 flex flex-col gap-y-5 items-center min-[750px]:items-start w-[250px] min-[400px]:w-[250px] min-[400px]:w-[300px] min-[550px]:w-[420px] min-[750px]:w-[600px] min-[1800px]:w-[800px]">
            <div className="w-[250px] min-[400px]:w-[300px] min-[550px]:w-[420px] min-[750px]:w-[600px] min-[1800px]:w-[800px] min-[1800px]:w-[800px] flex flex-col gap-y-5">
              <div className="flex gap-x-3 min-[750px]:gap-x-8">
                <div className="w-[50%] flex flex-col">
                  <input
                    type="text"
                    name="Name"
                    value={mainValues.name}
                    onChange={(e) =>
                      setMainValues((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="Name"
                    className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:mb-1 min-[1800px]:mb-1 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm min-[1800px]:text-base">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div className="w-[50%] flex flex-col">
                  <input
                    type="text"
                    name="lastName"
                    value={mainValues.lastName}
                    onChange={(e) =>
                      setMainValues((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Last Name"
                    className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:mb-1 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm min-[1800px]:text-base">
                      {errors.lastName}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col">
                <input
                  type="email"
                  name="Email"
                  value={mainValues.email}
                  onChange={(e) =>
                    setMainValues((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="Email"
                  className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:mb-1 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm min-[1800px]:text-base">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {method === "Card" && (
          <div className="mt-6 flex flex-col gap-y-5 items-start w-[250px] min-[400px]:w-[300px] min-[550px]:w-[420px] min-[750px]:w-[600px] min-[1800px]:w-[800px]">
            <div className="w-full">
              <label className="text-lg">Card Name</label>
              <input
                type="text"
                name="cardName"
                placeholder="John Doe"
                className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:my-1 ${
                  errors.cardName ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.cardName && (
                <span className="text-red-500 text-sm min-[1800px]:text-base">
                  {errors.cardName}
                </span>
              )}
            </div>
            <div className="relative w-full">
              <label className="text-lg">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                onInput={handleCardInput}
                className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:my-1 ${
                  errors.cardNumber ? "border-red-500" : "border-gray-300"
                } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm min-[1800px]:text-base">
                  {errors.cardNumber}
                </span>
              )}
            </div>
            <div className="flex justify-between gap-x-3 min-[750px]:gap-x-8 w-full">
              <div className="w-full">
                <label className="text-lg">Expiry</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  maxLength={5}
                  onInput={handleExpiryInput}
                  className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:my-1 ${
                    errors.expiryDate ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.expiryDate && (
                  <span className="text-red-500 text-sm min-[1800px]:text-base">
                    {errors.expiryDate}
                  </span>
                )}
              </div>
              <div className="w-full">
                <label className="text-lg">CVV</label>
                <input
                  type="text"
                  maxLength="3"
                  name="cvv"
                  placeholder="CVV"
                  onInput={(e) =>
                    (e.target.value = e.target.value.replace(/\D/g, ""))
                  }
                  className={`block w-full px-4 py-3 min-[1800px]:py-4 min-[1800px]:text-lg min-[1800px]:my-1 ${
                    errors.cvv ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 border  rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.cvv && (
                  <span className="text-red-500 text-sm min-[1800px]:text-base min-[1800px]:text-base">
                    {errors.cvv}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {method === "PayPal" && (
          <a
            href="https://www.paypal.com"
            target="_blank"
            onClick={() => {
              const handleVisibilityChange = () => {
                if (document.visibilityState === "visible") {
                  alert("Your order has been made.");
                  localStorage.removeItem("bag");
                  location.assign("/");
                  document.removeEventListener(
                    "visibilitychange",
                    handleVisibilityChange
                  );
                }
              };
              document.addEventListener(
                "visibilitychange",
                handleVisibilityChange
              );
            }}
            className="flex justify-center items-center font-semibold text-lg min-[1800px]:text-2xl bg-gray-100 text-black rounded-xl px-5 mt-7 shadow-sm"
          >
            <p className="mr-2">Pay with</p>
            <img
              src={paypal}
              alt="PayPal"
              className="w-[100px] min-[1800px]:w-[120px] rounded-xl"
            />
          </a>
        )}

        {method === "Bank" && (
          <div className="mt-6 w-[250px] min-[400px]:w-[300px] min-[550px]:w-[420px] min-[750px]:w-[600px] min-[1800px]:w-[800px]">
            <p className="text-lg mb-2">
              Make a transfer to the account with the following details:
            </p>
            <div className="flex flex-col bg-gray-100 rounded-lg py-8 gap-y-5">
              <div className="flex justify-around w-full">
                <div>
                  <p className="max-[550px]:text-sm">Account Number</p>
                  <p
                    className={`font-bold min-[550px]:text-lg flex relative ${
                      copy && "text-green-500"
                    } transition-all`}
                  >
                    012345678910{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[16px] min-[550px]:w-[20px] ml-2 scale-x-[-1] cursor-pointer absolute -right-3.5 min-[550px]:-right-5 top-0.5 min-[550px]:top-[1.3px]"
                      onClick={handleAccountNumber}
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                      <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                    </svg>
                  </p>
                  <span
                    className={`text-sm font-normal text-green-500 transition-all ${
                      copy ? "" : "hidden"
                    }`}
                  >
                    Copied!
                  </span>
                </div>

                <div>
                  <p className="max-[550px]:text-sm">Bank Name</p>
                  <p className="font-bold min-[550px]:text-lg flex">
                    City Bank
                  </p>
                </div>
              </div>

              <div className="flex justify-around w-full">
                {[
                  { title: "Account Name", text: "Nike Shoes" },
                  { title: "Amount", text: "$" + total },
                ].map((m) => (
                  <div key={m.title}>
                    <p className="max-[550px]:text-sm">{m.title}</p>
                    <p className="font-bold min-[550px]:text-lg flex">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div
          className={`mt-6 min-[1800px]:mt-8 mb-5 shadow-lg ${
            method === "PayPal" && "hidden"
          }`}
        >
          <button
            onClick={handleSubmit}
            className="bg-black text-xl min-[1800px]:text-2xl text-white py-3 min-[1800px]:py-4 px-4 rounded-lg hover:bg-gray-900 transition-colors duration-300 w-[250px] min-[400px]:w-[300px] min-[550px]:w-[420px] min-[750px]:w-[600px] min-[1800px]:w-[800px]"
          >
            {(method === "Card" && "Pay Now " + "($" + total + ")") ||
              (method === "PayPal" && "") ||
              (method === "Bank" && "Confirm Payment")}
          </button>
        </div>
      </div>
    </section>
  );
};
