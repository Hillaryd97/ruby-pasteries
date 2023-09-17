import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false); // Initialize state for the navbar

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen); // Toggle the navbar state
  };
  return (
    <div>
      <div className="">
        <div className="flex justify-between items-center py-3 pt-4">
          <div className="flex lg:items-center flex-col lg:-space-y-2">
            <img src={logo} alt="" className=" w-20 -ml-2" />
            <p className="font-playfair-display lg:text-sm hidden lg:block font-bold uppercase bg-clip-text text-transparent bg-gradient-to-b from-primary to-red-950">
              Ruby Pastries
            </p>
          </div>
          <form className="flex lg:hidden">
            <input
              type="text"
              className="border rounded-lg rounded-r-none border-red-600 py-0.5 px-1.5 -ml-5 focus:outline-none"
              placeholder="Search..."
            />
            <button
              type="submit"
              className="shadow-md border border-red-600 bg-primary text-white rounded-lg rounded-l-none px-2 py-1"
            >
              <AiOutlineSearch />
            </button>
          </form>
          <div className="lg:flex hidden space-x-3 uppercase font-semibold justify-evenly">
            <NavLink to={"/"} className={"hover:text-primary hover:font-bold"}>
              Home
            </NavLink>
            <NavLink to={"/store"} className={"hover:text-primary hover:font-bold"}>
              Store
            </NavLink>
            <NavLink to={"/account"} className={"hover:text-primary hover:font-bold"}>
              Account
            </NavLink>
            <NavLink to={"/about"} className={"hover:text-primary hover:font-bold"}>
              About
            </NavLink>
            <NavLink className={"hover:text-primary hover:font-bold"}>
              Contact Us
            </NavLink>
          </div>
          <form className="hidden lg:flex">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-lg rounded-r-none px-3 py-0.5 border-red-600 focus:outline-none"
            />
            <button
              type="submit"
              className="shadow-md border border-red-600 bg-primary text-white rounded-lg rounded-l-none px-2 py-1"
              placeholder="Search..."
            >
              <AiOutlineSearch />
            </button>
          </form>
          <div className="lg:hidden flex">
            <button
              className={`text-primary z-30 font-bold text-xl uppercase ${
                isNavOpen ? "z-50" : ""
              }`} // Increase z-index when the menu is open
              onClick={toggleNav}
            >
              {/* Hamburger Icon */}
              <div className="w-6 h-1 bg-primary mb-1"></div>
              <div className="w-6 h-1 bg-primary mb-1"></div>
              <div className="w-6 h-1 bg-primary"></div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-secondary overflow-y-auto transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } z-20 transition-transform ease-in-out duration-300`}
      >
        <ul className="pt-16 pb-4 pl-4 text-black text-lg">
          <li>
            <NavLink
              to="/"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/store"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Store
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/account"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
