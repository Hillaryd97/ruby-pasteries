import { supabase } from "../createClient.js"; // Import your Supabase client
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderStatus from "../components/OrderStatus";
import { FaPlus } from "react-icons/fa";
const Dashboard = () => {

  const sanityCmsUrl = "https://rubypastries.sanity.studio/";
  const [orders, setOrders] = useState([]);
  const [editedOrders, setEditedOrders] = useState([]);
  const handlePaymentConfirmedChange = async (id) => {
    const updatedOrders = editedOrders.map((order) =>
      order.id === id ? { ...order, payment_confirmed: "Confirmed" } : order
    );

    try {
      await supabase
        .from("cartDetails")
        .update({
          payment_confirmed: "Confirmed",
        })
        .eq("id", id);
    } catch (error) {
      console.error("Error updating payment confirmation:", error.message);
    }

    setEditedOrders(updatedOrders);
  };

  const handleOrderCompletedChange = async (id) => {
    const updatedOrders = editedOrders.map((order) =>
      order.id === id ? { ...order, order_completed: "Completed" } : order
    );

    try {
      await supabase
        .from("cartDetails")
        .update({
          order_completed: "Completed",
        })
        .eq("id", id);
    } catch (error) {
      console.error("Error updating order completion:", error.message);
    }

    setEditedOrders(updatedOrders);
  };

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("cartDetails")
        .select("*")
        .order("created_at", { ascending: false }); // Optional: Order the results as per your requirement

      if (error) {
        console.error("Error fetching orders:", error.message);
        return;
      }

      setOrders(data || []);
      setEditedOrders(data || []);
    }

    const realtime = supabase
      .channel("cartDetails")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "cartDetails" },
        (payload) => {
          console.log("Change received!", payload);
          const updatedOrders = editedOrders.map((order) =>
            order.id === payload.new.id ? payload.new : order
          );

          setEditedOrders(updatedOrders);
        }
      )
      .subscribe();

    fetchOrders();

    // Cleanup the real-time subscription when the component unmounts
    return () => {
      realtime.unsubscribe();
    };
  }, [editedOrders]);

  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="container mx-auto py-8 bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-primary mb-1">
              Admin Dashboard
            </h1>
            <p className="mb-8 text-lg">
              Welcome! What are you doing today?
            </p>
          </div>
          <a
            href={sanityCmsUrl}
            className="hidden bg-green-600 h-fit text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 lg:flex items-center justify-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPlus className="text-xl" /> {/* The React Icons component */}
            <span>Add New Product</span>
          </a>
        </div>
        <OrderStatus />
        <a
            href={sanityCmsUrl}
            className="lg:hidden mt-3 bg-green-600 h-fit text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center justify-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPlus className="text-xl" /> {/* The React Icons component */}
            <span>Add New Product</span>
          </a>
        <div className="overflow-x-auto my-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Payment Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Delivery Type
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Order Price
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Order Completed
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left font-bold text-xs leading-4 text-gray-500 uppercase tracking-wider">
                  Payment Confirmed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    {order.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.address}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.payment_type}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.delivery_type}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    ₦{order.total_price}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    {order.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <div className="flex flex-col justify-center items-center">
                      <button
                        className={`${
                          order.order_completed === "Completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        } text-white py-1 px-2 rounded mr-2`}
                        onClick={() => handleOrderCompletedChange(order.id)}
                      >
                        {order.order_completed === "Completed"
                          ? "Completed"
                          : "Complete Order"}
                      </button>
                      <p
                        className={`${
                          order.order_completed === "Completed"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        {/* {order.order_completed} */}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                    <div className="flex flex-col items-center">
                      <button
                        className={`${
                          order.payment_confirmed === "Confirmed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        } text-white py-1 px-2 rounded mr-2`}
                        onClick={() => handlePaymentConfirmedChange(order.id)}
                      >
                        {order.payment_confirmed === "Confirmed"
                          ? "Confirmed"
                          : "Confirm Payment"}
                      </button>
                      <p
                        className={`${
                          order.payment_confirmed === "Confirmed"
                            ? "text-green-500"
                            : "text-blue-500"
                        }`}
                      >
                        {/* {order.payment_confirmed} */}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
      </div>
    </div>
  );
};

export default Dashboard;
