import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = ({ token }) => {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
    console.log("Gone");
  }

  return (
    <div className="flex flex-col space-y-2">
      <p className="">
        Hello,{" "}
        <span className="font-semibold">
          {token.user.user_metadata.fullname}
        </span>
      </p>
      <p>
        From your account dashboard, you can view your recent orders, manage
        your shipping details and billing addresses. <br /> <br /><br />
      </p>
      <button
        onClick={handleLogout}
        className={`cursor-pointer md:text-base text-sm hover:scale-105 duration-300 bg-red-600 px-6 md:w-fit text-white rounded-full py-1.5`}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
