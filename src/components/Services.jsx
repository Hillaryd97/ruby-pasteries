import React from "react";
import { GiHamburger } from "react-icons/gi";
import { GiSlicedBread } from "react-icons/gi";
import { MdOutdoorGrill } from "react-icons/md";

const Services = () => {
  return (
    <div className="container mx-auto py-8">
      <h4 className="font-playfair-display md:text-3xl pb-5 text-2xl text-center font-bold">
        What We Offer
      </h4>
      <div className="flex flex-col md:flex-row items-center md:space-y-0 space-y-4 justify-between md:justify-around">
        <div className="bg-white p-4 w-64 shadow-md  text-primary hover:scale-105 hover:bg-secondary transform duration-500  flex flex-col space-y-1 justify-center items-center">
          <GiHamburger size={60} className="md:block hidden" />
          <GiHamburger size={40} className="md:hidden" />
          <p className="text-text font-bold text-xl">Snacks</p>
          <p className="text-sm text-center text-gray-700">
            From crispy samosas to savory puffs, our snacks are made with the
            finest ingredients and seasoned to perfection.
          </p>
        </div>
        <div className="bg-white p-4 w-64 shadow-md  text-primary hover:scale-105 hover:bg-secondary transform duration-500 flex flex-col space-y-1 justify-center items-center">
          <GiSlicedBread size={60} className="md:block hidden" />
          <GiSlicedBread size={40} className="md:hidden" />
          <p className="text-text font-bold text-xl">Bread</p>
          <p className="text-sm text-center text-gray-700">
            {" "}
            Our freshly baked bread is the foundation of every great meal. We have a wide selection of bread to
            complement any dish.
          </p>
        </div>
        <div className="bg-white p-4 w-64 shadow-md  text-primary hover:scale-105 hover:bg-secondary transform duration-500  flex flex-col space-y-1 justify-center items-center">
          <MdOutdoorGrill size={60} className="md:block hidden" />
          <MdOutdoorGrill size={40} className="md:hidden" />
          <p className="text-text font-bold text-xl">Outdoor Events</p>
          <p className="text-sm text-center text-gray-700">
            {" "}
            Our outdoor catering service brings our delicious
            finger foods to your gatherings, ensuring that every guest leaves
            with a smile.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
