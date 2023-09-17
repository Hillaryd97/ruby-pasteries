import React from "react";
import Login from "./Login";
import Register from "./Register";

const LoginRegister = ({setToken}) => {
  return (
    <div className="flex flex-col justify-center lg:flex-row mt-10">
      <div className="w-full lg:w-fit p-4 lg:p-8 bg-white rounded-lg shadow-lg">
        {/* Content for the left page of the "book" */}
        <Register />
      </div>
      <div className="w-full lg:w-fit p-4 lg:p-8 bg-white rounded-lg shadow-lg mt-4 lg:mt-0 lg:ml-4">
        {/* Content for the right page of the "book" */}
        <Login  setToken={setToken} />
      </div>
    </div>
  );
};

export default LoginRegister;
