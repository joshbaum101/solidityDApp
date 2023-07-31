import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./navigation/NavBar";
import LandingPage from "./pages/Landing";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<LandingPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
