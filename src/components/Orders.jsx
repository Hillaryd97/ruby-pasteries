import React, { useEffect, useState } from "react";
import { supabase } from "../createClient.js";
import { useStateContext } from "../../context/StateContext";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const { email } = useStateContext();
  function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("cartDetails")
        .select("*")
        .eq("email", token.user.email);

      if (error) {
        console.error("Error fetching orders:", error.message);
        return;
      }

      setOrders(data || []);
    }

    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg ">
      {console.log("email", token.user.email)}
      <h1 className="text-3xl font-bold mb-4">Your Past Orders</h1>
      {orders.length < 1 ? (
        <p className="text-lg">You have not ordered anything before.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full ">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-2 px-4">Order Number</th>
                <th className="text-left py-2 px-4">Order Date</th>
                <th className="text-left py-2 px-4">Product Name</th>
                <th className="text-left py-2 px-4">Quantity</th>
                <th className="text-left py-2 px-4">Total Price</th>
                <th className="text-left py-2 px-4">Delivery Location</th>{" "}
                <th className="text-left py-2 px-4">Payment Status</th>
                <th className="text-left py-2 px-4">Order Status</th>
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
                  <td className="py-2 px-4">{order.delivery_type}</td>
                  <td className="py-2 px-4">{order.payment_confirmed}</td>
                  <td className="py-2 px-4">{order.order_completed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
