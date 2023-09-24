import React from "react";
import logo from "../assets/logo.png";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-6 space-x-4 bg-black lg:justify-evenly justify-center text-white flex flex-row">
        <div className="flex justify-center flex-col items-center h-full">
          <div className="flex items-center -space-x-1">
            <img src={logo} alt="" className=" w-20 -ml-2" />
            <p className="font-bold uppercase ">Ruby Pastries</p>
          </div>
          {/* <p className="hidden text-sm lg:block">
            At Ruby Pastries, we are on a mission to awaken your taste buds and
            elevate your culinary journey.
          </p> */}
        </div>
        <div className="flex flex-col lg:items-start text-sm  items-center max-w-1/4">
          <h5 className="font-playfair-display font-semibold text-base text-secondary">
            Accepted Payment Methods
          </h5>
          <p>- Visa</p>
          <p>- Verve</p>
          <p>- MasterCard</p>
        </div>
        <div className="flex flex-col lg:items-start text-sm  w-fit max-w-1/4 items-center">
          <h5 className="font-playfair-display font-semibold text-base text-secondary">
            What We Offer
          </h5>
          <p>Snacks</p>
          <p>Bread</p>
          <p>Outdoor Events</p>
        </div>
        <div className="flex flex-col lg:items-start text-sm  w-1/4 max-w-1/4 space-y-2 items-center">
          <h5 className="font-playfair-display font-semibold text-base text-secondary">
            Shop Location
          </h5>
          <div className="flex space-x-2 items-center">
            <HiLocationMarker size={60} />
            <address className="text-justify">
              <span className="font-bold"> Nasarawa </span> - Ruby Bakery, No.
              10, Alloyd Monek International School Avenue, Karu Local
              Government, Nasarawa State.
              <br /> <span className="font-bold">Abuja</span> - PPMC
              Corporative, Store C Ground Floor, NNPC Towers, Abuja.
            </address>
          </div>
        </div>
        <div className="flex flex-col lg:items-start text-sm  w-fit max-w-1/4 pr-5 items-center">
          <h5 className="font-playfair-display font-semibold text-base text-secondary">
            Contact Us
          </h5>
          <div className="flex space-x-2 items-center hover:text-primary hover:scale-105">
            <AiFillPhone />
            <a href="tel:+2348177772021">+234 817 777 2021</a>
          </div>
          <div className="flex space-x-2 items-center hover:text-primary hover:scale-105">
            <MdEmail />
            <a href="mailto:rubyIntegrated@gmail.com">
              rubyIntegrated@gmail.com
            </a>
          </div>
      
        </div>
      </div>
      <div className="bg-background">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-center hover:text-primary duration-300 py-2 text-text">
         <a href="https://simi-hillary.vercel.app/">
         Copyright &copy; 2023 Ruby Pastries | Powered by Ruby Pastries
         </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
