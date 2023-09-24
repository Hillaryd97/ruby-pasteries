import React from "react";
import NavAll from "../components/NavAll";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="relative bg-background min-h-screen">
      <NavAll />
      <div className="container mx-auto p-8 relative z-10">
        <h1 className="text-4xl font-bold text-red-800 text-center mb-8">
          About Us
        </h1>
        <div className="p-6 flex md:text-center items-center justify-center">
            <div className="flex flex-col md:w-5/6">
          <h2 className="text-3xl text-center font-semibold text-red-800 mb-4">
            Welcome to Ruby Pastries
          </h2>
          <p className="text-gray-800">
            Indulge in a world of exquisite flavors and culinary artistry at
            Ruby Pastries. We are dedicated to creating delightful finger foods
            that will awaken your taste buds and elevate your dining experience
            to new heights. From our mouthwatering bread selections to our
            tantalizing snacks, every item in our menu is carefully crafted to
            delight your senses and satisfy your cravings.
          </p>
        </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className=" bg-red-100 shadow-sm bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">
              What We Offer
            </h2>
            <ul className="list-disc list-inside text-gray-800">
              <li className="mb-4">
                <span className="font-bold">Bread:</span> Our freshly baked
                bread is the foundation of every great meal. Whether you're
                craving a warm baguette, a soft and fluffy roll, or a hearty
                whole-grain loaf, we have a wide selection of bread to
                complement any dish.
              </li>
              <li className="mb-4">
                <span className="font-bold">Snacks:</span> Our savory snacks are
                perfect for satisfying those midday cravings or for sharing with
                friends and family. From crispy samosas to savory puffs, our
                snacks are made with the finest ingredients and seasoned to
                perfection.
              </li>
              <li className="mb-4">
                <span className="font-bold">Outdoor Catering:</span> Planning a
                special event? Let Ruby Pastries take care of the culinary
                delights. Our outdoor catering service brings our delicious
                finger foods to your gatherings, ensuring that every guest
                leaves with a smile.
              </li>
            </ul>
          </div>
          <div className=" bg-red-100 shadow-sm bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">
              Our Values
            </h2>
            <ul className="list-disc list-inside text-gray-800">
              <li className="mb-4">
                <span className="font-bold">Quality:</span> We never compromise
                on the quality of our ingredients. We source the finest locally
                grown produce and use time-tested techniques to create
                exceptional pastries.
              </li>
              <li className="mb-4">
                <span className="font-bold">Passion:</span> Baking is not just a
                business for us; it's a passion. We pour our hearts and souls
                into every creation, and we hope you can taste the love in every
                bite.
              </li>
              <li className="mb-4">
                <span className="font-bold">Creativity:</span> Innovation is at
                the heart of what we do. We are constantly experimenting with
                flavors and textures to bring you exciting new treats that
                surprise and delight.
              </li>
              <li>
                <span className="font-bold">Customer Satisfaction:</span> Your
                satisfaction is our ultimate goal. We take pride in providing
                exceptional customer service and ensuring that your experience
                with Ruby Pastries is nothing short of amazing.
              </li>
            </ul>
          </div>
          <div className=" bg-red-100 shadow-sm bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">
              Join Us
            </h2><Link to={"/adminDashboardk9PqX*3zYtW&7"}>Dashboard</Link>
            <p className="text-gray-800">
              We invite you to explore our website, browse our mouthwatering
              selection, and place an order to experience the magic of Ruby
              Pastries for yourself. Whether you're treating yourself or sharing
              with loved ones, we're here to make every moment special. Thank
              you for choosing Ruby Pastries. We look forward to serving you and
              becoming a part of your cherished moments.
            </p>
          </div>
          <div className=" bg-red-100 shadow-sm bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-800">
              Have questions or feedback? Feel free to reach out to us.
            </p>
            <div className="mt-4">
              <a
                href="mailto:rubyIntegrated@gmail.com"
                className="text-primary font-semibold inline-block hover:underline"
              >
                Email: rubyIntegrated@gmail.com
              </a>
            </div>
            <div className="mt-4">
              <a
                href="tel:+2348177772021"
                className="z-60 text-primary font-semibold inline-block hover:underline"
              >
                Phone: +234 817 777 2021
              </a>
            </div>
          </div>

          <div className="z-20  bg-red-100 shadow-sm bg-clip-padding backdrop-filter backdrop-blur-md rounded-lg p-6">
            <h2 className="text-3xl font-semibold text-red-800 mb-4">
              Location
            </h2>
            <p className="text-gray-800">
              <span className="font-semibold">Nasarawa</span> - Ruby Bakery, No.
              10, Alloyd Monek International School Avenue, Karu Local
              Government, Nasarawa State. <br />
              <span className="font-semibold">Abuja</span> - PPMC Corporative,
              Store C Ground Floor, NNPC Towers, Abuja.
            </p>
          </div>
        </div>
      </div>
      {/* Background Logo (Replace with your image path) */}
      <div
        className="z-10 absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover opacity-10 pointer-events-none"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>
      <div className="bg-background mx-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between py-2 text-text">
          <p className="">Copyright &copy; 2023 Ruby Pastries</p>
          <p>Powered by Ruby Pastries</p>
        </div>
      </div>                                                                                            
    </div>
  );
};

export default About;
