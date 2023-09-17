import { Link } from "react-router-dom";

const PastryCard = ({ image, price, category, pastry_name, link }) => {
  return (
    <div>
      <Link href={link}>
      <div className="md:w-48 w-44 p-3 py-3 bg-white shadow-sm border rounded-sm flex flex-col mb-10  ease-in-out duration-300 hover:scale-105 transform hover:shadow-lg transition-transform ">
      <img
        src={`${image}`}
        className="md:h-40 h-28 -mt-8 pb-1 md:pb-0 lg:shadow-md shadow-sm rounded-sm"
      />
      <div>
        <div className="space-y-1">
          <p className="text-center text-sm p-0.5 text-gray-500 italic">{category}</p>
          <h4 className="text-center text-lg">{pastry_name}</h4>
          <p className="text-lg text-right font-bold">₦{price}</p>
        </div>
        {/* <div className="flex flex-row md:justify-center justify-start font-bold space-x-2 w-full py-1">
          <button className="hover:bg-opacity-80 rounded-full bg-red-500 py-0.5 px-3 text-white">
            Like
          </button>
          <Link
            to={"/recipeCard"}
            className="hover:bg-opacity-80 rounded-full bg-primary py-0.5 px-3 text-white"
          >
            View
          </Link>
        </div> */}
      </div>
    </div>
      </Link>
    </div>
  );
};

export default PastryCard;
