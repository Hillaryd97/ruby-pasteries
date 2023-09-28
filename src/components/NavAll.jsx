import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import Cart from "./Cart";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineShopping,
} from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";

const NavAll = ({ onSearch, handleSearch }) => {
  const { showCart, setShowCart, totalQuantity, isCartOpen, toggleCart } =
    useStateContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const navRef = useRef(null);
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const toggleCart = () => {
  //   setIsCartOpen(!isCartOpen);
  // };
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    handleSearch(inputValue); // Call the handleSearch function with the updated query
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Call the onSearch callback from the Store component
    onSearch(searchQuery);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };

    // Add event listener for clicks outside of the navigation menu
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  return (
    <div className="mb-16">
      <div className="fixed top-0 left-0 right-0 bg-background z-50">
        <div className="flex justify-between items-center mx-4 py-3 pt-4">
          <div className="flex lg:items-center flex-col lg:-space-y-2">
            <img src={logo} alt="" className=" w-20 -ml-2" />
            <p className="font-playfair-display lg:text-sm hidden lg:block font-bold uppercase bg-clip-text text-transparent bg-gradient-to-b from-primary to-red-950">
              Ruby Pastries
            </p>
          </div>
          {/* <form onSubmit={handleSearchSubmit} className="flex lg:hidden">
            <input
              type="text"
              className="border rounded-lg rounded-r-none border-red-600 py-0.5 px-1.5 -ml-5 focus:outline-none"
              placeholder="Search..."
              value={searchQuery} // Bind input value to searchQuery state
              onChange={handleSearchChange} // Handle input change
            />
            <button
              type="submit"
              disabled={!searchQuery}
              className="hover:bg-opacity-70 cursor-pointer shadow-md border border-red-600 bg-primary text-white rounded-lg rounded-l-none px-2 py-1"
            >
              <AiOutlineSearch />
            </button>
          </form> */}
          {/* ... (rest of your navigation code) */}
          <div className="lg:flex hidden space-x-3 uppercase font-semibold justify-evenly">
            <NavLink
              to={"/"}
              className="hover:text-primary hover:font-bold hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to={"/store"}
              className="hover:text-primary hover:font-bold hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              Store
            </NavLink>
            <NavLink
              to={"/account"}
              className="hover:text-primary hover:font-bold hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              Account
            </NavLink>
            <NavLink
              to={"/about"}
              className="hover:text-primary hover:font-bold hover:bg-gray-100 hover:scale-105 transition-transform duration-300"
            >
              About
            </NavLink>

            <div
              className="flex lg:hidden text-primary cursor-pointer"
              onClick={toggleCart}
            >
              <AiOutlineShopping size={35} />
            </div>
          </div>
          {/* 
          <form onSubmit={handleSearchSubmit} className="lg:flex hidden">
            <input
              type="text"
              className="border rounded-lg rounded-r-none border-red-600 py-0.5 px-1.5 -ml-5 focus:outline-none"
              placeholder="Search..."
              value={searchQuery} // Bind input value to searchQuery state
              onChange={handleSearchChange} // Handle input change
            />
            <button
              type="submit"
              disabled={!searchQuery}
              className="hover:bg-opacity-70 cursor-pointer shadow-md border border-red-600 bg-primary text-white rounded-lg rounded-l-none px-2 py-1"
            >
              <AiOutlineSearch />
            </button>
          </form> */}

          <div className="flex lg:hidden space-x-2 items-center justify-center">
            <div
              className="flex lg:hidden text-primary cursor-pointer"
              onClick={toggleCart}
            >
              <AiOutlineShopping size={35} />
            </div>

            <button
              onClick={toggleNav}
              className="lg:hidden text-3xl relative z-50 hover:text-primary focus:text-primary text-black"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
      </div>
      <div
      ref={navRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-secondary shadow-lg overflow-y-auto transform ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        } z-20 transition-transform ease-in-out duration-300`}
      >
        {/* <button onClick={toggleNav} className="lg:hidden text-3xl absolute top-3 right-3 z-50 hover:text-primary focus:text-primary text-black"><AiOutlineMenu /></button> */}

        <ul className="pt-24 pb-4 pl-4 text-black text-lg">
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
            <Link
              to="/store"
              onClick={toggleNav}
              className="block py-2 px-4 hover:bg-primary hover:text-white transition duration-300"
            >
              Store
            </Link>
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
        </ul>
      </div>
      <div
        className="z-50 fixed bottom-5 left-5  bg-white border-2 text-primary border-secondary p-4 rounded-full shadow-lg cursor-pointer"
        onClick={toggleCart}
      >
        <AiOutlineShopping />
        <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full px-2 py-1 text-xs">
          {totalQuantity}
        </span>
      </div>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default NavAll;
