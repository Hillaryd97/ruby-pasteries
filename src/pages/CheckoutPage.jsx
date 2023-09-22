import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/StateContext";
import { supabase } from "../createClient"; // Import useAuth and supabase from your Supabase setup

const CheckoutPage = ({ token }) => {
  // Get cart items, total price, total quantity, and placeOrder function from context
  const {
    cartItems,
    totalPrice,
    totalQuantity,
    placeOrder,
  } = useStateContext();

  // State for delivery type
  const [deliveryType, setDeliveryType] = useState("homeDelivery");

  // State for user details (you can replace these with your user data)
  const [formData, setFormData] = useState({
    fullname: `${token.user.user_metadata.fullname}`,
    email: `${token.user.email}`,
    phone: "",
    // shippingAddress: "",
    // billingAddress: "",
    // fullname: formData.fullname
  });

  useEffect(() => {
    // Function to fetch the user's account details
    async function fetchAccountDetails() {
      const email = token.user.email; // Get the user's email

      // Fetch the account details
      const { data, error } = await supabase
        .from("accountDetails")
        .select()
        .eq("email", email); // Filter by email

      if (error) {
        console.error("Error fetching account details:", error);
        return;
      }

      // Assuming you expect only one matching record, you can set it in state
      if (data && data.length > 0) {
        setAccountData(data[0]);
      }
    }

    // Call the fetchAccountDetails function when the component mounts
    fetchAccountDetails();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto">
        <div className="py-8">
          <h2 className="text-2xl font-bold text-primary">Checkout</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                value={token.user.user_metadata.fullname}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="text-lg">
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="w-full border rounded py-1 px-2"
                value={userData.phoneNumber}
                onChange={(e) =>
                  setUserData({ ...userData, phoneNumber: e.target.value })
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
                onChange={(e) => setDeliveryType(e.target.value)}
              >
                <option value="homeDelivery">Home Delivery</option>
                <option value="pickup">Pickup</option>
              </select>
            </div>
            <button
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-80 duration-300"
              onClick={() => placeOrder()}
            >
              Place Order
            </button>
            <Link to="/cart" className="block mt-4 text-primary">
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
