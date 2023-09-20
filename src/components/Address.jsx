import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal";
import { supabase } from "../createClient"; // Import useAuth and supabase from your Supabase setup
import AddressForm from "./AddressForm";

const Address = ({ token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        setIsLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setAccountData(data[0]);
      } else {
        // User's email doesn't exist in accountDetails database
        setAccountData(null); // Reset any existing data
      }
      setIsLoading(false);
    }

    fetchAccountDetails();
  }, [accountData]);

  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Address</h2>
        <p className="">This address will be used on the checkout page by default.</p>
      </div>
      {isLoading ? (
        // Loading state message
        <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-primary h-16 w-16"></div>
      </div>
      ) : (
        <>
          {accountData ? ( // Check if accountData is available
            <div className="flex space-x-4">
              <div className="flex flex-col bg-white w-fit shadow-md">
                <div className="bg-gray-100 flex flex-row justify-between p-3">
                  <h4 className="font-bold">Shipping Address</h4>
                </div>
                <div className="p-3">
                  <p>
                    {accountData.street}, {accountData.state},{" "}
                    {accountData.city}, {accountData.country}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Display message if accountData is not available
            <div className="flex space-x-4">
              <div className="flex flex-col bg-white w-fit shadow-md">
                <div className="bg-gray-100 flex flex-row justify-between p-3">
                  <h4 className="font-bold">Shipping Address</h4>
                </div>
                <div className="p-3">
                  <p>Please set up your account details first.</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={openModal}
            className="md:w-fit font-bold bg-primary text-white px-6 py-1.5 hover:bg-opacity-80 duration-300 rounded-xl"
          >
            Edit Address
          </button>
          {isModalOpen && (
            <AddressForm
              onCancel={closeModal}
              token={token}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Address;
