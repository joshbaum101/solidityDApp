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
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import FundraiserCreationPage from "./pages/CreateFund";
import AllFundraisersPage from "./pages/AllFunds";
import FundraiserDetailsPage from "./pages/FundDetails";
import MyFundraisersPage from "./pages/MyFunds";

const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/createFundraiser"
        element={<FundraiserCreationPage />}
      ></Route>
      <Route path="/allFundraisers" element={<AllFundraisersPage />}></Route>
      <Route
        path="/fundraiserDetails/:address"
        element={<FundraiserDetailsPage />}
      ></Route>
      <Route path="/myFundraisers" element={<MyFundraisersPage />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
