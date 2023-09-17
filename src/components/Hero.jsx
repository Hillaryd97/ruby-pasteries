import img1 from "../assets/img (3).jpeg";
import img2 from "../assets/img (11).jpeg";
import img3 from "../assets/img (6).jpeg";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Hero = () => {
  return (
    <div className="lg:min-h-screen">
      <Nav />
      <div>
        <div className="grid lg:grid-cols-2 lg:gap-10 lg:pt-24">
          <div className="lg:space-y-5 space-y-6">
            <h2 className="font-playfair-display capitalize pt-4 lg:pt-0 lg:text-5xl md:text-4xl text-4xl lg:text-left text-center font-bold lg:pr-[9rem]">
              experience <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-yellow-500 ">Delight</span> in every
              bite
            </h2>
            <p className="lg:text-left text-center lg:pr-[6rem]">
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-t from-primary to-yellow-500 font-semibold">Ruby Pastries</span>{" "}
              – Where Every Bite is a Delight! At Ruby Pastries, we are
              passionate about crafting delectable finger foods that awaken your
              taste buds and elevate your culinary experience. From
              mouthwatering bread and tantalizing snacks to our wide range of
              offerings is designed to delight your senses and satisfy your
              cravings.
            </p>
            <div className="lg:flex space-x-6 hidden">
              <Link className="w-fit px-10 bg-primary text-white text-lg text-center py-1.5 rounded-xl hover:bg-opacity-70 duration-300 shadow-md font-bold">
                Order Now
              </Link>
              <Link className="w-fit px-10 bg-secondary text-black text-lg text-center py-1.5 rounded-xl hover:bg-opacity-60 duration-300 shadow-md font-bold">
                Explore
              </Link>
            </div>
          </div>
          <div className="flex justify-center items-center lg:-space-x-32 -space-x-20 lg:pt-10 pt-6">
            <img
              src={img1}
              alt="Croissants"
              className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-primary "
            />
            <img
              src={img2}
              alt="Croissants"
              className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-l-0 border-primary"
            />
            <img
              src={img3}
              alt="Croissants"
              className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-l-0 border-primary"
            />
          </div>
          <div className="flex flex-col lg:hidden space-y-2 pt-6">
            <Link className="w-full bg-primary text-white text-lg text-center py-1.5 rounded-xl hover:bg-opacity-80 duration-300 shadow-md font-bold">
              Order Now
            </Link>
            <Link className="w-full bg-secondary text-black text-lg text-center py-1.5 rounded-xl hover:bg-opacity-60 duration-300 shadow-md font-bold">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
