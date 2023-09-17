import PastryCard from "./PastryCard";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { client } from "../../lib/client";
import { urlFor } from "../../lib/client";

const Offers = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "product"]{
          image,
          name, 
          category->,
          price, 
          slug,
          details
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

      // Display the first 4 shuffled products
      const initialDisplay = shuffledProducts.slice(0, 4);
      setDisplayedProducts(initialDisplay);

      // Update currentIndex to 4 to start from the next set of products
      setCurrentIndex(4);
    };

    const intervalId = setInterval(rotateProducts, 24 * 60 * 60 * 1000); // 24 hours

    // Initial display of products
    if (products.length > 0) {
      const initialDisplay = products.slice(0, 4);
      setDisplayedProducts(initialDisplay);
    }

    return () => clearInterval(intervalId); 
  }, [products]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-playfair-display lg:text-3xl text-2xl font-bold text-primary pb-1 text-center">
          Featured Pastries
        </h3>
        <p className="text-gray-700 mb-2 capitalize">
          Handcrafted creations, each pastry a work of art.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-10 lg:mx-20">
        {displayedProducts.map((product) => (
          <PastryCard
            pastry_name={product.name}
            category={product.category.name}
            image={urlFor(product.image && product.image[0])}
            product={product}
            price={product.price}
            link={`/product/${product.slug.current}`}
            key={product.slug.current}
          />
        ))}
      </div>
    </div>
  );
};

export default Offers;
