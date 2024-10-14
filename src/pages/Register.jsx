import { useState } from "react";
import { supabase } from "../createClient";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname: formData.fullname,
            // phone: formData.phone,
          },
        },
      });
      // alert(
      //   `Registration Sucessful! Check ${formData.email} for verification link`
      // );
      // console.log(data)
      navigate("/account");
    } catch (error) {
      alert(error);
    }
  }

  return (
    
    <div className="flex lg:p-4 ">
      <div >
        <div className="flex flex-col ">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div>
              <h2 className="lg:-mt-0 font-semibold text-center text-2xl">
                Register
              </h2>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-sm">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                onChange={handleChange}
                required
                className="border border-b-1 border-gray-400 p-1.5 mt-1 lg:py-0.5 px-2 rounded-md"
              />
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
              Create Account
            </button>
          </form>
          {/* <p className="text-center pt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-400 hover:ease-in-out duration-300"
            >
              Login
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
