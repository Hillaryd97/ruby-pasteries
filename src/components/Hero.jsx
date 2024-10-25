import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "./NavAll";
import img1 from "../assets/img (3).jpeg";
import img2 from "../assets/img (11).jpeg";
import img3 from "../assets/img (6).jpeg";
import { client } from "../../lib/client";
import { urlFor } from "../../lib/client";

const Hero = () => {
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(4);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product" && available == true]{
          ...,
          'category': category->,
        }`
      )
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const rotateProducts = () => {
      if (products.length === 0) return;
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
      const initialDisplay = shuffledProducts.slice(0, 3);
      setDisplayedProducts(initialDisplay);
      setCurrentIndex(4);
    };

    const intervalId = setInterval(rotateProducts, 24 * 60 * 60 * 1000);

    if (products.length > 0) {
      const initialDisplay = products.slice(0, 3);
      setDisplayedProducts(initialDisplay);
    }

    return () => clearInterval(intervalId);
  }, [products]);
  return (
    <div className="lg:min-h-screen">
      <Nav />
      <div className="grid lg:grid-cols-2 lg:gap-10 lg:pt-24 items-center justify-center">
        <motion.div
          className="lg:space-y-5 space-y-6"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h2 className="font-playfair-display capitalize pt-4 lg:pt-0 lg:text-5xl md:text-4xl text-4xl lg:text-left text-center font-bold lg:pr-[9rem]">
            experience{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-yellow-500 ">
              Delight
            </span>{" "}
            in every bite
          </h2>
          <p className="lg:text-left text-center lg:pr-[6rem]">
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-primary to-yellow-500 font-semibold">
              Ruby Pastries
            </span>{" "}
            – Where Every Bite is a Delight! At Ruby Pastries, we are passionate
            about crafting delectable finger foods that awaken your taste buds
            and elevate your culinary experience. From mouthwatering bread and
            tantalizing snacks to our wide range of offerings is designed to
            delight your senses and satisfy your cravings.
          </p>
          <div className="lg:flex space-x-6 hidden">
            <Link
              to={"/store"}
              className="w-fit px-10 bg-primary text-white text-lg text-center py-1.5 rounded-xl hover:bg-opacity-70 duration-300 shadow-md font-bold"
            >
              Order Now
            </Link>
            {/* <Link className="w-fit px-10 bg-secondary text-black text-lg text-center py-1.5 rounded-xl hover:bg-opacity-60 duration-300 shadow-md font-bold">
                Explore
              </Link> */}
          </div>
        </motion.div>
        <motion.div
          className="flex justify-center items-center lg:-space-x-32 -space-x-20 lg:pt-10 pt-6"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          {/* {displayedProducts.length > 0
              ? displayedProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    className={`overflow-hidden ${
                      index % 2 === 0 ? "mt-0" : "mt-8"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={
                        product?.image
                          ? urlFor(product?.image[0])
                          : `https://placehold.co/600x400?text=${product?.name}`
                      }
                      alt={product.name}
                      className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-primary "
                    />
                  </motion.div>
                ))
              : // Placeholder images while products load
                [...Array(4)].map((_, index) => (
                  <motion.div
                    key={index}
                    className={`overflow-hidden rounded-2xl shadow-lg ${
                      index % 2 === 0 ? "mt-0" : "mt-8"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/api/placeholder/400/320"
                      alt="Loading..."
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                ))} */}
          <motion.img
            src={img1}
            alt="Croissants"
            className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-primary "
          />
          <motion.img
            src={img2}
            alt="Croissants"
            className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-l-0 border-primary"
          />
          <motion.img
            src={img3}
            alt="Croissants"
            className="rounded-full shadow-md lg:w-[16rem] lg:h-[16rem] w-[10rem] h-[10rem] border-2 border-l-0 border-primary"
          />
        </motion.div>
        <motion.div
          className="flex flex-col lg:hidden space-y-2 pt-6"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Link
            to={"/store"}
            className="w-full bg-primary text-white text-lg text-center py-1.5 rounded-xl hover-bg-opacity-80 duration-300 shadow-md font-bold"
          >
            Order Now
          </Link>
          {/* <Link className="w-full bg-secondary text-black text-lg text-center py-1.5 rounded-xl hover-bg-opacity-60 duration-300 shadow-md font-bold">
              Explore
            </Link> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
