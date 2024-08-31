import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ShoesGrid } from "./views/ShoesGrid.jsx";
import { ShoeDetail } from "./views/ShoeDetail.jsx";
import { Bag } from "./views/Bag.jsx";
import { BagProvider } from "./context/useBag.jsx";
import { LikedProvider } from "./context/useLiked.jsx";
import { Liked } from "./views/Liked.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/featured" replace />,
  },
  {
    path: "/featured",
    element: <App />,
  },
  {
    path: ":category",
    element: <ShoesGrid />,
  },
  {
    path: ":category/:shoe",
    element: <ShoeDetail />,
  },
  {
    path: "/bag",
    element: <Bag />,
  },
  {
    path: '/liked',
    element: <Liked />
  },
  {
    path: "*",
    element: <p className="">Error 404</p>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BagProvider>
      <LikedProvider>
        <RouterProvider router={router} />
      </LikedProvider>
    </BagProvider>
  </React.StrictMode>
);
