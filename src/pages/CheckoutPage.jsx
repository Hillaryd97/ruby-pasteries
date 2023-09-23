import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import { supabase } from "../createClient";

import Nav from "../components/Nav";

const CheckoutPage = () => {
  // Get cart items, total price, total quantity, and placeOrder function from context
  const {
    cartItems,
    totalPrice,
    totalQuantity,
    placeOrder,
    deliveryType,
    setDelivery,
    paymentType, // Add paymentType from context
    setPayment, // Add setPayment function from context
    postCartDetailsToSupabase,
  } = useStateContext();

  const token = JSON.parse(sessionStorage.getItem("token"));

  // State for user details (you can replace these with your user data)
  const [formData, setFormData] = useState({
    fullname: `${token.user.user_metadata.fullname}`,
    email: `${token.user.email}`,
  });

  // State for payment type
  const handlePaymentTypeChange = (event) => {
    setPayment(event.target.value); // Assuming the payment type is selected through an input field
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8 lg:w-1/2 px-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Checkout</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item._id} className="mb-4">
                <p className="text-lg">{item.name}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-primary">₦{item.price.toFixed(2)}</p>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Total Quantity: {totalQuantity}
              </p>
              <p className="text-xl font-bold text-primary">
                Total Price: ₦{totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Delivery Details</h3>
            <div className="mb-4">
              <label htmlFor="name" className="text-lg">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-full border rounded py-1 px-2"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-lg">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="w-full border rounded py-1 px-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label htmlFor="deliveryType" className="text-lg">
                Delivery Type:
              </label>
              <select
                id="deliveryType"
                className="w-full border rounded py-1 px-2"
                value={deliveryType}
                onChange={(e) => setDelivery(e.target.value)}
              >
                <option value="Home Delivery">Home Delivery</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="paymentType" className="text-lg">
                Payment Type:
              </label>
              <select
                id="paymentType"
                className="w-full border rounded py-1 px-2"
                value={paymentType}
                onChange={handlePaymentTypeChange}
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Pay On Delivery">Pay On Delivery</option>
              </select>
            </div>
            <button
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-80 duration-300"
              onClick={postCartDetailsToSupabase}
            >
              Place Order
            </button>
            <Link to="/store" className="block mt-4 text-primary">
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
