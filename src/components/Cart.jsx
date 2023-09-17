import { useState } from "react";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);
  // const closeCart = () => {
  //   setCartItems([]);
  // };
  return (
    <div className="fixed bottom-16 right-5 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex space-x-7 items-center justify-between">
        <h2>Cart</h2>
        {/* <button className="text-gray-600 font-bold text-xl" onClick={closeCart}>
          &times;
        </button> */}
      </div>
      <p>Items</p>
    </div>
  );
};

export default Cart;
