import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PastryCard from "../../components/PastryCard";
import Nav from "../../components/NavAll";
import img3 from "../../assets/img (6).jpeg";
import { urlFor, client } from "../../../lib/client";
import { Link } from "react-router-dom";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { useStateContext } from "../../../context/StateContext";

function ProductDetails() {
  // Get the slug parameter from the URL
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [displayedLikableProducts, setDisplayedLikableProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { decQty, incQty, qty, onAdd, addToCart } = useStateContext();

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const productData = await client.fetch(
          `*[_type == "product" && slug.current == '${slug}']{
            ...,
          'category': category->,
          }`
        );
        // console.log(productData)

        if (productData && productData.length > 0) {
          setProducts(productData);
          setIsLoading(false);
          console.log("hellop", productData);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [slug]);

  useEffect(() => {
    // Function to fetch products
    const fetchSimilarProducts = async () => {
      try {
        const similarProductData = await client.fetch(
          `*[_type == "product" && available == true]{
            ...,
            'category': category->,
          }`
        );
        // console.log(similarProductData)
        if (similarProductData && similarProductData.length > 0) {
          setSimilarProducts(similarProductData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchSimilarProducts(); // Call the function to fetch products
  }, []);

  const renderLoading = () => {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full border-t-4 border-b-4 border-primary h-16 w-16"></div>
      </div>
    );
  };
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

  useEffect(() => {
    // Function to display a random selection of products
    const displayRandomLikableProducts = () => {
      if (similarProducts.length === 0) return;

      // Shuffle the products
      const shuffledProducts = [...similarProducts].sort(
        () => Math.random() - 0.5
      );

      // Display the first 100 shuffled products (adjust as needed)
      const initialDisplay = shuffledProducts.slice(0, 8);
      setDisplayedLikableProducts(initialDisplay);
      // console.log(initialDisplay)
    };

    displayRandomLikableProducts(); // Call the function to display random products
  }, [similarProducts]);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto">
        <Nav />
        {isLoading ? (
          renderLoading() // Show loading animation while products are loading
        ) : (
          <div>
            {displayedProducts.map((product) => (
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8"
                key={product._id}
              >
                <div className="flex flex-row justify-center items-center">
                  <img
                    src={urlFor(product.image && product.image[0])}
                    alt={product.name}
                    className="rounded-lg shadow-lg h-[20rem] md:w-3/4 mx-auto md:mx-0"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold">{product.name}</h1>

                  <p className="text-primary text-2xl font-semibold mt-2">
                    ₦{product.price.toFixed(2)}
                  </p>
                  <div className="flex flex-row items-center space-x-1 mt-3">
                    <div className="flex flex-row border-2 border-black space-x-3 items-center bg-white w-fit px-2">
                      <button
                        className="cursor-pointer text-black hover:text-red-500 transition-colors duration-300"
                        onClick={decQty}
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="text-lg font-semibold">{qty}</span>
                      <button
                        className="cursor-pointer text-black hover:text-green-500 transition-colors duration-300"
                        onClick={incQty}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAdd(product, qty)}
                      className="shadow-lg bg-red-600 text-white py-1 px-2 hover:bg-opacity-70 duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <h4 className="text-lg font-medium mt-4">Description:</h4>
                  <p className="text-gray-800 mt-1">
                    {product.details ||
                      `Introducing the ${product.name}. This carefully crafted delight is a perfect blend of flavors and textures that will tantalize your taste buds. Whether you're a seasoned foodie or simply craving a delicious snack, our ${product.name} is here to satisfy.`}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Category: {product.category?.name || "Uncategorized"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto">
        <h2 className="text-2xl pt-4 text-primary font-bold capitalize text-center">
          You may also like
        </h2>
        <div className="">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 justify-evenly mx-2 md:mx-10 py-10">
            {displayedLikableProducts.map((product) => (
              <Link to={`/product/${product.slug.current}`} key={product._id}>
                <PastryCard
                  pastry_name={product.name}
                  category={product.category.name}
                  image={
                    product.image
                      ? urlFor(product.image && product.image[0])
                      : "https://placehold.co/600x400"
                  }
                  price={product.price}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
