import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineClose,
  AiOutlineDelete,
} from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../lib/client";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);
  // const closeCart = () => {
  //   setCartItems([]);
  // };
  // const cartClass = `fixed top-0 left-0 h-full w-2/6 bg-white p-4 rounded-lg shadow-lg z-50 transition-transform duration-300 transform ${
  //   isCartOpen ? "translate-x-0" : "-translate-x-full"
  // }`;
  const variants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  };

  const transition = { duration: 0.3, ease: "easeInOut" };

  const { decQty, incQty, qty, onAdd } = useStateContext();

  const cartRef = useRef();
  const { totalPrice, totalQuantity, cartItems, isCartOpen, toggleCart } =
    useStateContext();
  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed top-0 left-0 h-full w-2/6 bg-white p-4 rounded-lg shadow-lg z-50"
          initial="closed"
          animate={isCartOpen ? "open" : "closed"}
          exit="closed"
          variants={variants}
          transition={transition}
        >
          <div className="flex space-x-7 items-center justify-between border-b-2 py-2">
            <h4 className="font-bold text-lg">
              YOUR CART
              <span className="text-primary"> ({totalQuantity} items)</span>
            </h4>
            <div>
              <button type="button" onClick={toggleCart}>
                <AiOutlineClose />
              </button>
            </div>
          </div>
          {cartItems.length < 1 && (
            <div className="flex flex-col justify-center items-center h-full">
              <AiOutlineShopping size={150} />
              <h3>Your Cart Is Empty</h3>
              <Link href="/">
                <button
                  type="button"
                  className="bg-primary text-white px-6 py-1.5 mt-4"
                  onClick={toggleCart}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          )}
          <div className="pt-3 w-full  ">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex w-full rounded-lg space-x-3 bg-red-50 shadow border-b"
                >
                  <img
                    src={urlFor(item?.image[0])}
                    className="w-28 rounded-lg h-28"
                    alt=""
                  />
                  <div className="w-full pt-1.5 flex flex-col justify-between">
                    <div className="flex flex-row pr-2 w-full justify-between">
                      <h5 className="font-bold text-red-950">{item.name}</h5>
                    </div>
                    <h4 className="font-bold">₦{item.price.toFixed(2)}</h4>
                    <div className="flex justify-between w-full pr-2 pb-2">
                      <div className="flex flex-row border-2 border-black space-x-3 items-center bg-white w-fit px-2">
                        <button
                          className="cursor-pointer text-black hover:text-red-500 transition-colors duration-300"
                          onClick={""} // Call your remove function here
                        >
                          <AiOutlineMinus />
                        </button>
                        <span className="text-lg font-semibold">{0}</span>{" "}
                        {/* Display the current quantity */}
                        <button
                          className="cursor-pointer text-black hover:text-green-500 transition-colors duration-300"
                          onClick={""} // Call your add function here
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                      <button className="text-black duration-300 hover:text-primary" onClick={""}>
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {cartItems.length >= 1 && (
            <div className="absolute px-3 bottom-2 left-0 w-full">
              <div className="  bg-white flex ">
                <div className="font-bold flex flex-row items-center w-full justify-between ">
                  <h3>Subtotal:</h3>
                  <h3>₦{totalPrice}</h3>
                </div>
              </div>
              <div className="flex justify-center items-center pt-6">
                <button
                  type="button"
                  className="hover:bg-opacity-80 duration-300 rounded-lg bg-primary text-white  py-1 w-5/6"
                  onClick={""}
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
