import React, { useEffect, useState } from "react";
import { supabase } from "../createClient.js";

const OrderStatus = () => {
  const [newOrders, setNewOrders] = useState([]);
  //   const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    // Calculate the time 2 hours ago from now
    const twoHoursAgo = new Date();
    twoHoursAgo.setHours(twoHoursAgo.getHours() - 2);

    // Fetch data for new, pending, and completed orders from cartDetails table
    async function fetchOrders() {
      const { data: newOrdersData, error: newOrdersError } = await supabase
      .from("cartDetails")
      .select("*")
      .eq("order_completed", "Pending");

      //   const { data: pendingOrdersData, error: pendingOrdersError } = await supabase
      //     .from('cartDetails')
      //     .select('*')
      //     .eq('order_status', 'Pending');

      const { data: completedOrdersData, error: completedOrdersError } =
        await supabase
          .from("cartDetails")
          .select("*")
          .eq("order_completed", "Completed");

      if (newOrdersError || completedOrdersError) {
        console.error(
          "Error fetching orders:",
          newOrdersError,
          completedOrdersError
        );
        return;
      }

      setNewOrders(newOrdersData || []);
      setCompletedOrders(completedOrdersData || []);
    }

    // Fetch data for total customers from accountDetails table
    async function fetchTotalCustomers() {
      const { data, error } = await supabase
        .from("accountDetails")
        .select("id");
      // Count the number of customers

      if (error) {
        console.error("Error fetching total customers:", error.message);
        return;
      }
      setTotalCustomers(data?.length || 0);
      console.log(data.length);
    }

    fetchOrders();
    fetchTotalCustomers();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-200 p-4 rounded-md hover:shadow-lg transition duration-300 transform hover:scale-105">
          <h3 className="text-lg font-semibold">Incomplete Orders</h3>
          <p className="text-2xl font-bold">{newOrders.length}</p>
        </div>
        <div className="bg-blue-200 p-4 rounded-md hover:shadow-lg transition duration-300 transform hover:scale-105">
          <h3 className="text-lg font-semibold">Completed Orders</h3>
          <p className="text-2xl font-bold">{completedOrders.length}</p>
        </div>
        <div className="bg-purple-200 p-4 rounded-md hover:shadow-lg transition duration-300 transform hover:scale-105">
          <h3 className="text-lg font-semibold">Total Customers</h3>
          <p className="text-2xl font-bold">{totalCustomers}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
