import { supabase } from "../createClient.js"; // Import your Supabase client
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderStatus from "../components/OrderStatus";
import { FaPlus } from "react-icons/fa";
const Dashboard = () => {
  // Replace 'YOUR_SANITY_CMS_URL' with the actual URL of your Sanity CMS
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
     
     <p className="text-xl">Under Construction... Please check back later</p>

    </div>
  );
};

export default Dashboard;
