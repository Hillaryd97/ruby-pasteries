import PastryCard from "./PastryCard";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { client } from "../../lib/client";
import { urlFor } from "../../lib/client";

const ProductLanding = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    // Function to rotate products randomly every 24 hours
    const rotateProducts = () => {
      if (products.length === 0) return;

      // Create a copy of the products array and shuffle it
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

      // Display the next 4 shuffled products
      const nextDisplay = shuffledProducts.slice(
        currentIndex,
        currentIndex + 4
      );

      // Update currentIndex for the next rotation
      setCurrentIndex((prevIndex) =>
        prevIndex + 4 >= shuffledProducts.length ? 0 : prevIndex + 4
      );

      setDisplayedProducts(nextDisplay);
    };

    const intervalId = setInterval(rotateProducts, 24 * 60 * 60 * 1000); // 24 hours

    // Initial display of products
    if (products.length > 0) {
      const initialDisplay = getRandomSet(products, 4);
      setDisplayedProducts(initialDisplay);
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [products]);

  // Function to get a random set of products
  const getRandomSet = (array, setSize) => {
    if (array.length <= setSize) {
      return array;
    }

    const shuffledArray = [...array].sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, setSize);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-playfair-display lg:text-3xl text-2xl font-bold text-primary pb-1 text-center">
          All Products
        </h3>
        <p className="text-gray-700 text-sm lg:text-base mb-2 capitalize">
          Discover a world of sweet delights
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 mt-10 lg:mx-20">
        {displayedProducts.map((product) => (
        <Link to={`/product/${product.slug.current}`} key={product._id}>
        {/* <a
          href={`/product/${product.slug.current}`}
          // Optionally add any other attributes or styles you need
        > */}
          <PastryCard
            pastry_name={product.name}
            category={product.category.name}
            image={urlFor(product.image && product.image[0])}
            price={product.price}
          />
        {/* </a> */}
      </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          to="/store"
          className="border-2 border-primary flex justify-center items-center font-semibold px-4 py-1.5 rounded-xl hover:bg-primary hover:text-white hover:border-white bg-white duration-300"
        >
          Visit Store <AiOutlineArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default ProductLanding;
