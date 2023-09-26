import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    handlePhoneChange,
    handleAddressChange, // Add setAddress function from context
    phone, // Add phone from context
    address, // Add address from context
    updatedTotalPrice,
    calculateDeliveryFee,
    deliveryFee,
    setDeliveryFee,
    totalWithDelivery,
    deliveryFees,
    clearCart,
  } = useStateContext();

  const handleCloseOrderConfirmation = () => {
    // setIsOrderConfirmed(false); // Close the order confirmation
    clearCart(); // Clear the cart

    // setTimeout(() => {
      navigate("/store");
    // }, 2000);
  };

  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  // const [deliveryFee, setDeliveryFee] = useState(0); // Initialize with 0

  // const calculateDeliveryFee = () => {
  //   // You can add your logic here to calculate the fee based on deliveryType
  //   // For example, you can set a fixed fee for Home Delivery and Pickup
  //   if (deliveryType === "Home Delivery") {
  //     return 2500.0; // Example delivery fee for Home Delivery
  //   } else if (deliveryType === "Pickup") {
  //     return 0.0; // No delivery fee for Pickup
  //   }
  //   return 0.0; // Default to 0 if deliveryType is not recognized
  // };

  // // Update delivery fee when deliveryType changes
  // useEffect(() => {
  //   const fee = calculateDeliveryFee();
  //   setDeliveryFee(fee);
  // }, [deliveryType]);

  // Calculate the total price including delivery fee
  // const totalWithDelivery = totalPrice + deliveryFee;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert(
        "Your cart is empty. Please add items to your cart before checking out."
      );
      return; // Don't proceed with the submission
    }

    await postCartDetailsToSupabase();
    setShowOrderConfirmation(true);

    // Remove the timeout for redirection
  };

  // State for user details (you can replace these with your user data)
  const [formData, setFormData] = useState({
    fullname: `${token.user.user_metadata.fullname}`,
    email: `${token.user.email}`,
    phone: "",
    address: "",
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
              {/* <p className="text-sm italic">
                ** Delivery Fee will be relayed to you during payment process **
              </p> */}
              <p className="text-lg font-semibold">
                Total Quantity: {totalQuantity}
              </p>
              <p className="text-xl font-bold text-primary">
                Total Price: ₦{totalPrice.toFixed(2)}
              </p>
              <p className="text-lg">Delivery Fee: ₦{deliveryFee.toFixed(2)}</p>
              <p className="text-xl font-bold text-primary">
                Total with Delivery: ₦{totalWithDelivery.toFixed(2)}
              </p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
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
              <label htmlFor="phone" className="text-lg">
                Phone: <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                id="phone"
                className="w-full border rounded py-1 px-2"
                value={phone}
                onChange={handlePhoneChange} // Call the function to update the phone in the context
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="text-lg">
                Address:{" "}
                <span className="text-sm">
                  (Please enter exact address to ensure smooth delivery)
                </span>{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                id="address"
                className="w-full border rounded py-1 px-2"
                value={address}
                onChange={handleAddressChange} // Call the function to update the address in the context
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
                {/* <option value="Home Delivery">Home Delivery</option> */}
                <option value="Pickup">Pickup (Free)</option>
                {Object.keys(deliveryFees).map((location) => (
                  <option key={location} value={location}>
                    {location} - ₦{deliveryFees[location]}
                  </option>
                ))}
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
            {paymentType === "Bank Transfer" && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Bank Account Details:</h3>
                <p>
                  <span className="font-bold">Name:</span> Ruby Integrated
                  Global Services Limited
                </p>
                <p>
                  <span className="font-bold">Account Numbers:</span>
                  <br />
                  0013026916 (Jaiz bank)
                  <br />
                  0037940253 (Stanbic IBTC)
                </p>
              </div>
            )}
            <button
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-80 duration-300"
              onClick={handlePlaceOrder}
              type=""
            >
              Place Order
            </button>
            <Link to="/store" className="block mt-4 text-primary">
              Back to Store
            </Link>
          </form>
        </div>
      </div>
      {/* Order Confirmation Pop-up */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 flex flex-col justify-center items-center rounded-lg space-y-4 shadow-md md:w-96 text-center">
            <h2 className="text-primary text-2xl font-bold">Thank You</h2>
            <p className="text-lg font-semibold">Your order has been received!</p>
            {/* Display the total price with delivery */}
            <p className="text-lg ">
              Your Bill: 
              <span className="text-lg font-bold"> ₦{totalWithDelivery.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
            </p>
            <p className="">
              Please make payment to any of the following account numbers:
            </p>
            <div className="text-left">
              <p>
                <span className="font-bold">Name:</span> Ruby Integrated Global
                Services Limited
              </p>
              <p>
                <span className="font-bold">Account Numbers:</span>
                <br />
                0013026916 (Jaiz bank)
                <br />
                0037940253 (Stanbic IBTC)
              </p>
            </div>
            <button
              onClick={handleCloseOrderConfirmation}
              className="bg-primary px-3 py-1.5 text-white rounded-lg hover:bg-red-500 duration-300"
            >
              Close
            </button>
            {/* <Link
              to={"/store"}
              className="underline hover:text-primary duration-300"
            >
              Back To Store
            </Link> */}
            <p className="text-sm italic"> Note: Account details can be found in the About Us section incase this window is unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
