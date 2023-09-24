import React from "react";
import logo from "../assets/logo.png";
import { HiLocationMarker } from "react-icons/hi";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto py-6 space-y-4 md:space-y-0 md:space-x-4 bg-black lg:flex lg:justify-between items-center text-white">
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-20 h-20" />
            <p className="font-bold text-lg ml-2 uppercase">Ruby Pastries</p>
          </div>
          <p className="hidden md:block md:text-sm text-center">
            At Ruby Pastries, we are on a mission to awaken your taste buds and
            elevate your culinary journey.
          </p>
        </div>
        <div className="flex flex-col items-center md:flex-row">
          <div className="text-center md:text-left">
            <h5 className="font-playfair-display font-semibold text-base text-secondary">
              Accepted Payment Methods
            </h5>
            <p className="text-sm">- Visa</p>
            <p className="text-sm">- Verve</p>
            <p className="text-sm">- MasterCard</p>
          </div>
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h5 className="font-playfair-display font-semibold text-base text-secondary">
              Shop Location
            </h5>
            <div className="flex items-center space-x-2 mt-2">
              <HiLocationMarker size={24} />
              <address className="text-sm">
                <span className="font-bold">Nasarawa</span> - Ruby Bakery, No.
                10, Alloyd Monek International School Avenue, Karu Local
                Government, Nasarawa State.
                <br />
                <span className="font-bold">Abuja</span> - PPMC Corporative,
                Store C Ground Floor, NNPC Towers, Abuja.
              </address>
            </div>
            <div className="flex items-center justify-center space-x-2 mt-2 hover:text-primary hover:scale-105">
              <AiFillPhone size={24} />
              <a href="tel:+2348177772021">+234 817 777 2021</a>
            </div>
            <div className="flex items-center justify-center space-x-2 mt-2 hover:text-primary hover:scale-105">
              <MdEmail size={24} />
              <a href="mailto:rubyIntegrated@gmail.com">
                rubyIntegrated@gmail.com
              </a>
            </div>
          </div>
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h5 className="font-playfair-display font-semibold text-base text-secondary">
              What We Offer
            </h5>
            <p className="text-sm">- Snacks</p>
            <p className="text-sm">- Bread</p>
            <p className="text-sm">- Outdoor Events</p>
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="container mx-auto py-2 text-text text-center">
          <p className="text-sm">
            &copy; 2023 Ruby Pastries | Powered by Ruby Pastries
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
