import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import PastryCard from "../components/PastryCard";
import { client } from "../../lib/client";
import { Link } from "react-router-dom";
import { urlFor } from "../../lib/client";
import img1 from "../assets/img (3).jpeg";

const Store = () => {
  const [banner, setBanner] = useState(null);
  const [products, setProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await client.fetch(
          `*[_type == "product" && available == true]{
            ...,
            'category': category->,
          }`
        );

        if (productData && productData.length > 0) {
          setProducts(productData);
          categorizeProducts(productData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categorizeProducts = (products) => {
    const categorized = products.reduce((acc, product) => {
      const categoryName = product?.category?.name || "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    }, {});
    setCategorizedProducts(categorized);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const results = products.filter((product) => {
        const productName = product?.name.toLowerCase();
        const categoryName = (product?.category?.name || "Uncategorized").toLowerCase();
        const search = query.toLowerCase();
        return productName.includes(search) || categoryName.includes(search);
      });
      setSearchResults(results);
    }
  };

  useEffect(() => {
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
    fetchBanner();
  }, []);

  const renderLoading = () => (
    <div className="flex justify-center items-center h-20">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-primary h-16 w-16"></div>
    </div>
  );

  const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const renderProductGrid = (products) => (
    <motion.div
      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4"
      initial="hidden"
      animate="visible"
      variants={fadeInVariant}
    >
      {products.map((product) => (
        <Link to={`/product/${product?.slug?.current}`} key={product?._id}>
          <PastryCard
            pastry_name={product?.name || "Unknown Pastry"}
            category={product?.category?.name || "Uncategorized"}
            image={
              product?.image
                ? urlFor(product?.image[0])
                : `https://placehold.co/600x400?text=${product?.name}`
            }
            price={product?.price != null ? product?.price : "N/A"}
          />
        </Link>
      ))}
    </motion.div>
  );

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto">
        <Nav handleSearch={handleSearch} />

        {isLoading ? (
          renderLoading()
        ) : (
          <>
            <motion.div
              className="bg-cover bg-center h-48"
              style={{
                backgroundImage: `url(${
                  banner?.image ? urlFor(banner.image) : img1
                })`,
              }}
              initial="hidden"
              animate="visible"
              variants={fadeInVariant}
            >
              <div className="bg-opacity-60 bg-black h-full flex flex-col justify-center items-center text-center text-white p-4 md:p-8">
                <h1 className="text-lg md:text-2xl font-bold mb-2 md:mb-4">
                  {banner?.title || "Welcome to Our Store"}
                </h1>
                <p className="text-xs md:text-sm">
                  {banner?.information ||
                    "Discover our delicious pastries and treats!"}
                </p>
              </div>
            </motion.div>

            {searchQuery && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Search Results
                </h2>
                {renderProductGrid(searchResults)}
              </div>
            )}

            {!searchQuery &&
              Object.entries(categorizedProducts).map(
                ([category, products]) => (
                  <div key={category} className="mt-8">
                    <h2 className="text-2xl font-bold text-primary mb-8">
                      {category}
                    </h2>
                    {renderProductGrid(products)}
                  </div>
                )
              )}
          </>
        )}
      </div>

      <div className="bg-background mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between py-2 text-text">
          <p>Copyright &copy; 2024 Ruby Pastries</p>
          <p>Powered by Ruby Pastries</p>
        </div>
      </div>
    </div>
  );
};

export default Store;