import { supabase } from "../createClient.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderStatus from "../components/OrderStatus";
import { FaPlus, FaTrash, FaSearch, FaSort } from "react-icons/fa";

const Dashboard = () => {
  const sanityCmsUrl = "https://rubypastries.sanity.studio/";
  const [orders, setOrders] = useState([]);
  const [editedOrders, setEditedOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterStatus, setFilterStatus] = useState("all");

  const togglePaymentConfirmed = async (id) => {
    const order = editedOrders.find(order => order.id === id);
    const newStatus = order.payment_confirmed === "Confirmed" ? "Unconfirmed" : "Confirmed";
    
    const updatedOrders = editedOrders.map((order) =>
      order.id === id ? { ...order, payment_confirmed: newStatus } : order
    );

    try {
      await supabase
        .from("cartDetails")
        .update({
          payment_confirmed: newStatus,
        })
        .eq("id", id);
      
      setEditedOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating payment confirmation:", error.message);
    }
  };

  const toggleOrderCompleted = async (id) => {
    const order = editedOrders.find(order => order.id === id);
    const newStatus = order.order_completed === "Completed" ? "Pending" : "Completed";
    
    const updatedOrders = editedOrders.map((order) =>
      order.id === id ? { ...order, order_completed: newStatus } : order
    );

    try {
      await supabase
        .from("cartDetails")
        .update({
          order_completed: newStatus,
        })
        .eq("id", id);
      
      setEditedOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order completion:", error.message);
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await supabase
          .from("cartDetails")
          .delete()
          .eq("id", id);
        
        const updatedOrders = editedOrders.filter(order => order.id !== id);
        setEditedOrders(updatedOrders);
      } catch (error) {
        console.error("Error deleting order:", error.message);
      }
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...editedOrders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [editedOrders, sortConfig]);

  const filteredOrders = sortedOrders.filter(order => 
    (filterStatus === "all" || order.order_completed === filterStatus) &&
    (order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.order_id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("cartDetails")
        .select("*")
        .order("created_at", { ascending: false });

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

    return () => {
      realtime.unsubscribe();
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-primary mb-1">
              Admin Dashboard
            </h1>
            <p className="text-lg">
              Welcome! Manage your orders here.
            </p>
          </div>
          <a
            href={sanityCmsUrl}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 flex items-center space-x-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPlus className="text-xl" />
            <span>Add New Product</span>
          </a>
        </div>
        <OrderStatus />
        
        <div className="my-4 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search orders..."
              className="p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="ml-2 text-gray-500" />
          </div>
          <select
            className="p-2 border rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="overflow-x-auto my-10">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Order ID", "Customer Name", "Email", "Products", "Total Price", "Order Status", "Payment Status", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase().replace(' ', '_'))}
                  >
                    {header}
                    {sortConfig.key === header.toLowerCase().replace(' ', '_') && (
                      <FaSort className="inline ml-1" />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.order_id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₦{order.total_price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className={`${
                        order.order_completed === "Completed"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } text-white py-1 px-2 rounded mr-2`}
                      onClick={() => toggleOrderCompleted(order.id)}
                    >
                      {order.order_completed === "Completed"
                        ? "Completed"
                        : "Pending"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className={`${
                        order.payment_confirmed === "Confirmed"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } text-white py-1 px-2 rounded mr-2`}
                      onClick={() => togglePaymentConfirmed(order.id)}
                    >
                      {order.payment_confirmed === "Confirmed"
                        ? "Confirmed"
                        : "Unconfirmed"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;