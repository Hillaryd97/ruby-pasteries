import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence
import Nav from "../components/Nav";
import PastryCard from "../components/PastryCard";
import { client } from "../../lib/client";
import { BiSolidCartAlt } from "react-icons/bi";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";
import img1 from "../assets/img (3).jpeg";

const Store = () => {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const productData = await client.fetch(
          ` *[_type == "product"]{
            ...,
            'category': category->,
          }`
        );

        if (productData && productData.length > 0) {
          setProducts(productData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      // If the search query is empty, reset the search results
      setSearchResults([]);
    } else {
      // Perform search based on query
      const results = products.filter((product) => {
        const productName = product.name.toLowerCase();
        const categoryName = product.category.name.toLowerCase();
        const search = query.toLowerCase();

        return productName.includes(search) || categoryName.includes(search);
      });

      // Update the search results
      setSearchResults(results);
    }
  };

  // Function to display loading animation while products are loading
  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center h-20">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-primary h-16 w-16"></div>
      </div>
    );
  };

  useEffect(() => {
    // Function to fetch and display banner data
    const fetchBanner = async () => {
      try {
        const bannerData = await client.fetch(
          `*[_type == "banner"]{
            image,
            title, 
            information
          }`
        );

        if (bannerData && bannerData.length > 0) {
          setBanner(bannerData[0]);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    };

    fetchBanner(); // Call the function to fetch banner data
  }, []);

  useEffect(() => {
    // Function to display a random selection of products
    const displayRandomProducts = () => {
      if (products.length === 0) return;

      // Shuffle the products
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

      // Display the first 100 shuffled products (adjust as needed)
      const initialDisplay = shuffledProducts.slice(0, 100);
      setDisplayedProducts(initialDisplay);
    };

    displayRandomProducts(); // Call the function to display random products
  }, [products]);

  // Animation variants
  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto">
        <Nav handleSearch={handleSearch} />
        {isLoading ? (
          renderLoading() // Show loading animation while products are loading
        ) : (
          <motion.div
            className="bg-cover bg-center h-48"
            style={{
              backgroundImage: `url(${
                banner?.image ? urlFor(banner?.image) : img1
              })`,
            }}
            initial="hidden"
            animate="visible"
            variants={fadeInVariant}
          >
            <div className="bg-opacity-60 bg-black h-full flex flex-col justify-center items-center text-center text-white p-4 md:p-8">
              <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
                {banner?.title || "Title"}
              </h1>
              <p className="text-xs md:text-sm">
                {banner?.information ||
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus quo eveniet facilis autem nam error. Autem ipsum dolorum reiciendis soluta nihil, illum cum tempora architecto eveniet, quia consequatur voluptatem."}
              </p>
            </div>
          </motion.div>
        )}
        {searchResults.length > 0 && (
          <div className="justify-center items-center">
            <h2 className="lg:text-3xl text-2xl text-center text-primary py-2 ">
              Search Results
            </h2>
            <motion.div
              className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-10 lg:mx-20 justify-center items-center"
              initial="hidden"
              animate="visible"
              variants={fadeInVariant}
            >
              {searchResults.map((product) => (
                <Link to={`/product/${product.slug.current}`}>
                  <a
                    href={`/product/${product.slug.current}`}
                    // Optionally add any other attributes or styles you need
                  >
                    <PastryCard
                      pastry_name={product.name}
                      category={product.category.name}
                      image={urlFor(product.image && product.image[0])}
                      price={product.price}
                      key={product._id}
                    />
                  </a>
                </Link>
              ))}
            </motion.div>
          </div>
        )}
        {/* Grid for displayedProducts */}
        {
          <div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="font-playfair-display lg:text-3xl text-2xl font-bold text-primary py-2">
                All Products
              </h3>
            </div>
            <motion.div
              className="grid lg:grid-cols-4 md:grid-cols-3 mx-3 grid-cols-2 mt-10 lg:mx-20"
              initial="hidden"
              animate="visible"
              variants={fadeInVariant}
            >
              {displayedProducts.map((product) => (
                <Link to={`/product/${product.slug.current}`}>
                  <a
                    href={`/product/${product.slug.current}`}
                    // Optionally add any other attributes or styles you need
                  >
                    <PastryCard
                      pastry_name={product.name}
                      category={product.category.name}
                      image={urlFor(product.image && product.image[0])}
                      price={product.price}
                      key={product._id}
                    />
                  </a>
                </Link>
              ))}
            </motion.div>
          </div>
        }
      </div>
      <div className="bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between py-2 text-text">
          <p className="">Copyright &copy; 2023 Ruby Pastries</p>
          <p>Powered by Ruby Pastries</p>
        </div>
      </div>
    </div>
  );
};

export default Store;
