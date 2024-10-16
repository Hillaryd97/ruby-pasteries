import { Link } from "react-router-dom";

const PastryCard = ({ image, price, category, pastry_name, link }) => {
  // Safeguard to ensure the image is not undefined
  const imageUrl = image ? image : 'https://placehold.co/600x400';

  return (
    <div>
      <div className="md:w-48 w-36 md:p-3 py-3 p-2 bg-white shadow-sm border rounded-sm flex flex-col mb-10 ease-in-out duration-300 hover:scale-105 transform hover:shadow-lg transition-transform">
        <img
          src={imageUrl}
          className="md:h-40 h-28 -mt-8 pb-1 md:pb-0 lg:shadow-md shadow-sm rounded-sm"
          alt={pastry_name} // Adding alt attribute for accessibility
        />
        <div>
          <div className="space-y-1">
            <p className="text-center md:text-sm text-xs p-0.5 text-gray-500 italic">{category}</p>
            <h4 className="text-center md:text-lg">{pastry_name}</h4>
            <p className="md:text-lg text-right font-bold">₦{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastryCard;
