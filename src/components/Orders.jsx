import React, { useEffect, useState } from "react";
import { supabase } from "../createClient.js"; // Import your Supabase client

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  // const token = JSON.parse(sessionStorage.getItem("token"));
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }
  
  useEffect(() => {
    // Fetch the user's past orders from Supabase

    async function fetchOrders() {
      const { data, error } = await supabase
        .from("cartDetails")
        .select("*")
        .eq("email", token.user.email); // Filter orders by user's email

      if (error) {
        console.error("Error fetching orders:", error.message);
        return;
      }

      setOrders(data || []);
    }

    fetchOrders();
  }, []); // Fetch orders when the user's email changes

  return (
<div className="bg-white p-8 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold mb-4">Your Past Orders</h1>
  {orders.length < 1 ? (
    <p className="text-lg">You have not ordered anything before.</p>
  ) : (
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="text-left py-2 px-4">Order Number</th>
          <th className="text-left py-2 px-4">Order Date</th>
          <th className="text-left py-2 px-4">Product Name</th>
          <th className="text-left py-2 px-4">Quantity</th>
          <th className="text-left py-2 px-4">Total Price</th>
          <th className="text-left py-2 px-4">Delivery Type</th> {/* Add this column */}
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order.id} className="border-b border-gray-300">
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{formatDate(order.created_at)}</td>
            <td className="py-2 px-4">{order.product_name}</td>
            <td className="py-2 px-4">{order.quantity}</td>
            <td className="py-2 px-4">₦{order.total_price}</td>
            <td className="py-2 px-4">{order.delivery_type}</td> {/* Display the delivery type */}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>


  );
}

export default Orders;
