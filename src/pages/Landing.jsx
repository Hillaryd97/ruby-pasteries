import Hero from "../components/Hero";
import Offers from "../components/Offers";
// import { client } from "../../lib/client";
import ProductLanding from "../components/ProductLanding";
import AboutComp from "../components/AboutComp";
import Services from "../components/Services";
import AllCategories from "../components/AllCategories";
// import { BiSolidCartAlt } from "react-icons/bi";
// import { AiOutlineShopping } from "react-icons/ai";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import { useState } from "react";
import { ScrollRestoration } from "react-router-dom";
import { client } from "../../lib/client";

const Landing = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="bg-background text-text font-roboto min-h-screen ">
      <div className="container mx-auto space-y-10 px-4">
        <Hero />
        <ScrollRestoration />
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

export default Landing;
