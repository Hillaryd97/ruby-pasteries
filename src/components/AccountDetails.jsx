import { supabase } from "../createClient"; // Import useAuth and supabase from your Supabase setup
import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";

const AccountDetails = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountData, setAccountData] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: `${token.user.user_metadata.fullname}`,
    email: `${token.user.email}`,
    phone: "",
    // shippingAddress: "",
    // billingAddress: "",
    // fullname: formData.fullname
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

  useEffect(() => {
    // Function to fetch the user's account details
    async function fetchAccountDetails() {
      const email = token.user.email; // Get the user's email

      // Fetch the account details
      const { data, error } = await supabase
        .from("accountDetails")
        .select()
        .eq("email", email); // Filter by email

      if (error) {
        console.error("Error fetching account details:", error);
        return;
      }

      // Assuming you expect only one matching record, you can set it in state
      if (data && data.length > 0) {
        setAccountData(data[0]);
      }
    }

    // Call the fetchAccountDetails function when the component mounts
    fetchAccountDetails();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsLoading(true); // Set loading state to true before the check

      // Check if the email already exists in the accountDetails table
      const { data: existingData, error: existingError } = await supabase
        .from("accountDetails")
        .select("*")
        .eq("email", formData.email);

      if (existingError) {
        alert(existingError.message);
      } else if (existingData.length > 0) {
        alert("You have already submitted!");
      } else {
        // If the email doesn't exist, proceed with the insertion
        const { data, error } = await supabase.from("accountDetails").insert([
          {
            name: token.user.user_metadata.fullname,
            email: token.user.email,
            phone: formData.phone,
            // billingAddress: formData.billingAddress,
            // shippingAddress: formData.shippingAddress,
          },
        ]);

        if (error) {
          alert(error.message);
        } else {
          console.log(data);
          openModal(); // Open the success modal
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false when the check is done
    }
  }

  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>
      {isLoading ? (
        <div className="text-center">Uploading data...</div>
      ) : (
        <div className="flex flex-col-reverse">
          {accountData && (
            <div className="my-4 ">
              <div className="bg-white border border-gray-300 rounded-md p-4">
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name:
                  </label>
                  <p className="text-gray-900">{accountData.name}</p>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <p className="text-gray-900">{accountData.email}</p>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone{" "}
                  </label>
                  <p className="text-gray-900">{accountData.phone}</p>
                </div>
                {/* <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Shipping Address:
                  </label>
                  <p className="text-gray-900">{accountData.shippingAddress}</p>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Billing Address:
                  </label>
                  <p className="text-gray-900">{accountData.billingAddress}</p>
                </div> */}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                value={token.user.user_metadata.fullname}
                disabled
                className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={token.user.email}
                disabled
                className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number:
              </label>
              <input
                type="tel"
                name="phone"
                // value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Shipping Address:
              </label>
              <input
                type="text"
                name="shippingAddress"
                // value={formData.shippingAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Billing Address:
              </label>
              <input
                type="text"
                name="billingAddress"
                // value={formData.billingAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-1.5 px-3 text-gray-700 focus:outline-none focus:border-primary"
              />
            </div> */}
            {/* Add more fields as needed for account details */}
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80"
            >
              Save Details
            </button>
          </form>
        </div>
      )}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alertMessage={"Uploaded Succesfully!"}
      />
    </div>
  );
};

export default AccountDetails;
