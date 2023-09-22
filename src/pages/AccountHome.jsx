import React, { useState } from "react";
import Orders from "../components/Orders";
import Dashboard from "../components/Dashboard";
import Address from "../components/Address";
import AccountDetails from "../components/AccountDetails";
import { useNavigate } from "react-router-dom";
import Store from "./Store";
import ProductDetails from "./product/ProductDetails";
import Cart from "../components/Cart";
import CheckoutPage from "./CheckoutPage";

const AccountHome = ({ token }) => {
    let navigate = useNavigate()
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleClick = (component) => {
    setActiveComponent(component);
  };

//   function handleLogout() {
//     sessionStorage.removeItem('token');
//     navigate("/")
//     console.log("Gone")
//   }

  return (
    <div className="bg-gray-200 flex lg:flex-row flex-col">
      <nav className="bg-white shadow-md lg:w-[25%]">
        <ul className="flex flex-row justify-between items-center lg:items-start lg:space-y-4 lg:flex-col md:p-4 p-3">
          <li
            onClick={() => handleClick("dashboard")}
            className={`cursor-pointer md:text-base text-sm ${
              activeComponent === "dashboard" ? "text-primary font-bold" : ""
            }`}
          >
            Dashboard
          </li>
          <li
            onClick={() => handleClick("orders")}
            className={`cursor-pointer md:text-base text-sm ${
              activeComponent === "orders" ? "text-primary font-bold" : ""
            }`}
          >
            Orders
          </li>
          <li
            onClick={() => handleClick("address")}
            className={`cursor-pointer md:text-base text-sm ${
              activeComponent === "address" ? "text-primary font-bold" : ""
            }`}
          >
            Address
          </li>
          <li
            onClick={() => handleClick("account-details")}
            className={`cursor-pointer md:text-base text-sm ${
              activeComponent === "account-details"
                ? "text-primary font-bold"
                : ""
            }`}
          >
            Account Details
          </li>
            {/* <button
              onClick={handleLogout}
              className={`cursor-pointer md:text-base text-sm hover:scale-105 duration-300 bg-red-600 px-3 text-white rounded-full py-1.5`}
            >
              Logout
            </button> */}
        </ul>
      </nav>
      <div className="p-4 w-full" >
        {activeComponent === "dashboard" && <Dashboard token={token} />}
        {activeComponent === "orders" && <Orders token={token} />}
        {activeComponent === "address" && <Address token={token} />}
        {activeComponent === "account-details" && <AccountDetails  token={token} />}
      </div>
      <div className="hidden">
      <Store token={token}/>
      <ProductDetails token={token}/>
      <CheckoutPage token={token}/>
      </div>
    </div>
  );
};

export default AccountHome;
