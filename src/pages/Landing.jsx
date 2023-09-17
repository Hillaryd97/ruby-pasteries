import Hero from "../components/Hero";
import Offers from "../components/Offers";
import { client } from "../../lib/client";
import ProductLanding from "../components/ProductLanding";
import AboutComp from "../components/AboutComp";
import Services from "../components/Services";
import AllCategories from "../components/AllCategories";
import { BiSolidCartAlt } from "react-icons/bi";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import { useState } from "react";

const Landing = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="bg-background text-text font-roboto min-h-screen ">
      <div className="container mx-auto space-y-10 px-4">
        <Hero />
        <div
          className="fixed bottom-5 left-5  bg-white border-2 text-primary border-secondary p-3 rounded-full shadow-lg cursor-pointer"
          onClick={toggleCart}
        >
          <BiSolidCartAlt />
        </div>
        {isCartOpen && <Cart />}
        <Offers />
        <ProductLanding />
      </div>
      <AboutComp />
      <Services />
      <AllCategories />
      <Footer />
    </div>
  );
};

// export const getServerSideProps = async () =>  {
//   const query = '*[_type == "product"]';
//   const products = await client.fetch(query);

//   const bannerQuery = '*[_type == "banner"]';
//   const bannerData = await client.fetch(bannerQuery);

//   const catQuery = '*[_type == "categories"]';
//   const categories = await client.fetch(catQuery);

// }

export default Landing;
