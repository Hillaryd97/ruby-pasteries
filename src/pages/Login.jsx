import { useState } from "react";
import { supabase } from "../createClient";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    // phone: "",
    password: "",
  });
  // console.log(formData);
  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      //   alert(
      //     `Login Sucessful! Check ${formData.email} for verification link`
      //   );
      setToken(data);
      // console.log(data);

      navigate("/account");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="flex lg:p-4 ">
      <div className="">
        <div className="flex flex-col ">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div>
              <h2 className="lg:-mt-0 font-semibold text-center text-2xl">
                Login
              </h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm">
                Email
              </label>
              <input
                type="text"
                placeholder="Email Address "
                name="email"
                onChange={handleChange}
                required
                className="border border-b-1 border-gray-400 p-1.5 mt-1 lg:py-0.5 px-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm">
                Password
              </label>
              <input
                type="password"
                placeholder="Password "
                name="password"
                onChange={handleChange}
                required
                className="border border-b-1 border-gray-400 p-1.5 mt-1 lg:py-0.5 px-2 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="shadow-lg bg-red-600 text-white py-1 px-2 font-bold rounded-md hover:bg-red-400 hover:ease-in-out duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
