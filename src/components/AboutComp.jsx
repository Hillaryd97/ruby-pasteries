import { Link } from "react-router-dom";

const AboutComp = () => {
  return (
    <div className="bg-red-800 text-white mt-10 py-5">
      <div className="container mx-auto flex flex-col justify-center items-center lg:px-32 space-y-3 px-3 text-center">
        <h4 className="font-playfair-display lg:text-3xl text-2xl font-bold">Order Pastries Today </h4>
        <p className="text-sm lg:text-base">
          At Ruby Pastries, we are on a mission to awaken your taste buds and
          elevate your culinary journey. Our delectable finger foods,
          mouthwatering bread, and tantalizing snacks are designed to delight
          your senses and satisfy your cravings. Explore our offerings, order
          now, and let us make every moment special for you and your loved ones. 
<span className="font-semibold px-1">All items will only be available if you placed an order before 8pm a day before</span>
        </p>
        <Link className="w-fit lg:px-10 px-6 bg-red-50 text-text text-lg text-center py-1.5 rounded-xl hover:bg-opacity-70 duration-300 shadow-md font-bold">
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default AboutComp;
