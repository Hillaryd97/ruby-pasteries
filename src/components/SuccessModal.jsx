import React from "react";

const SuccessModal = ({ isOpen, onClose, alertMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-64 p-4 rounded shadow-lg flex flex-col justify- items-center">
        <p className="text-lg font-semibold mb-2">
          {alertMessage}
        </p>
        <button
          className="bg-primary text-white py-1 px-4 rounded-md hover:bg-opacity-80 focus:outline-none focus:bg-opacity-80"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
