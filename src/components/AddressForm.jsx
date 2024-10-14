import { useState } from "react";
import { supabase } from "../createClient";


const AddressForm = ({ onSubmit, onCancel, token,  setIsModalOpen }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
  
    // const openModal = () => {
    //   setIsModalOpen(true);
    // };
    // const closeModal = () => {
    //   setIsModalOpen(false);
    // };
  
  const [formData, setFormData] = useState({
    street: "",
    country: "",
    city: "",
    state: "",
  });
  // console.log(formData);

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
      try {
        const { data, error } = await supabase
          .from("accountDetails")
          .update({
            street: formData.street,
            country: formData.country,
            city: formData.city,
            state: formData.state,
          })
          .eq("email", token.user.email);
          // console.log(`${token.user.email}`)
        if (error) {
          throw error;
        }
        setIsModalOpen(false);

        return data;
      } catch (error) {
        console.error("Error updating address details:", error);
        throw error;
      }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-70 z-50">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Address</h2>
        <form onSubmit={handleSubmit}>
          {/* Street Address input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Street Address:
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>
          {/* Country input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Country:
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>
          {/* City/Town input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              City/Town:
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>
          {/* State input field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              State:
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-3 py-1.5 rounded-md mr-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-3 py-1.5 rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
