import React from "react";
import { motion } from "framer-motion"; // Import motion
import Login from "./Login";
import Register from "./Register";

const LoginRegister = ({ setToken }) => {
  // Animation variants for Login and Register components
  const slideInFromLeft = {
    hidden: { x: -1000 },
    visible: { x: 0, transition: { duration: 0.7 } },
  };

  const slideInFromRight = {
    hidden: { x: 1000 },
    visible: { x: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="flex flex-col items-center justify-center lg:flex-row mt-10">
      <motion.div
        className="w-full flex items-center justify-center lg:w-1/2 p-4 lg:p-8 bg-white rounded-lg shadow-lg"
        initial="hidden" // Set initial animation state
        animate="visible" // Set animate animation state
        variants={slideInFromLeft} // Use the slideInFromLeft animation
      >
        {/* Content for the left page */}
        <Register />
      </motion.div>
      <motion.div
        className=" lg:w-1/2 p-4 flex items-center justify-center lg:p-8 bg-white rounded-lg shadow-lg mt-4 lg:mt-0"
        initial="hidden" // Set initial animation state
        animate="visible" // Set animate animation state
        variants={slideInFromRight} // Use the slideInFromRight animation
      >
        {/* Content for the right page */}
        <Login setToken={setToken} />
      </motion.div>
    </div>
  );
};

export default LoginRegister;
