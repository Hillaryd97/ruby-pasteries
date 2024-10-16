import React from "react";
import logo from "../assets/logo.png";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-6 lg:flex space-y-3 lg:space-y-0 lg:space-x-4 bg-black lg:justify-evenly justify-center text-white">
        <div className="flex flex-col items-center mr-8 lg lg:flex-row">
          <div className="flex items-center space-x-1">
            <img src={logo} alt="" className="w-16 " />
            <p className="font-bold lg:text-sm uppercase">Ruby Pastries</p>
          </div>
        </div>
        <div className="flex flex-col lg:items-start text-sm items-center lg:max-w-1/4">
          <div className="text-center lg:text-left">
            <h5 className="font-playfair-display font-semibold text-base text-secondary">
              Accepted Payment Method
            </h5>
            <div className="mt-2">
              {/* <p>
                - <span className="font-bold">Name:</span> Ruby Integrated
                Global Services Limited
              </p>
              <p>
                <span className="font-bold">Account Numbers:</span>
                <br />
                0013026916 (Jaiz bank)
                <br />
                0037940253 (Stanbic IBTC)
              </p> */}
              <p>Bank Transfer</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:items-start text-sm items-center lg:max-w-1/4">
          <h5 className="font-playfair-display font-semibold text-base text-secondary">
            What We Offer
          </h5>
          <p>Snacks</p>
          <p>Bread</p>
          <p>Outdoor Events</p>
        </div>
        <div className="flex flex-col lg:items-start text-sm items-center px-2 lg: lg:w-72 lg:max-w-1/4">
          <h5 className="font-playfair-display font-semibold text-base text-secondary">
            Shop Location
          </h5>
          <div className="flex space-x-2 lg:space-x-0 items-center text-center lg:px-0 px-2">
            <address className="text-justify">
              <span className="font-bold"> Nasarawa </span> - Ruby Bakery, No.
              10, Alloyd Monek International School Avenue, Karu Local
              Government, Nasarawa State.
              <br /> <span className="font-bold">Abuja</span> - PPMC
              Corporative, Store C Ground Floor, NNPC Towers, Abuja.
            </address>
          </div>
        </div>
        <div className="flex flex-col lg:items-start text-sm lg:pr-4 items-center lg:max-w-1/4">
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
        <div className="container px-4 mx-auto flex flex-col lg:flex-row justify-center hover:text-primary duration-300 py-2 text-text">
          <a href="https://simi-hillary.vercel.app/">
            Copyright &copy; 2024 Ruby Pastries | Powered by Ruby Pastries
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
