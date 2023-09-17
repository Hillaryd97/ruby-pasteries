import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import PastryCard from "../components/PastryCard";
import { client } from "../../lib/client";
import { urlFor } from "../../lib/client";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState({
    title: "",
    information: "",
    image: "", // Replace with a default image URL
  });

  useEffect(() => {
    // Fetch both "product" and "banner" data in parallel
    Promise.all([
      client.fetch(
        `*[_type == "product"]{
          image,
          name, 
          category->,
          price, 
          slug,
          details
        }`
      ),
      client.fetch(
        `*[_type == "banner"]{
          image,
          title, 
          information
        }`
      ),
    ])
      .then(([productData, bannerData]) => {
        setProducts(productData);
        if (bannerData && bannerData.length > 0) {
          setBanner(bannerData[0]);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto">
        <Nav />
        <div
          className="bg-cover bg-center h-48"
        //   style={{ backgroundImage: `url(${urlFor(banner.image).url()})` }}
        >
          <div className="bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-black p-8">
            <h1 className="text-2xl font-bold mb-4">{banner.title}</h1>
            <p className="">{banner.information}</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-10 lg:mx-20">
          {products?.map((product) => (
            <PastryCard
              key={product.id}
              pastry_name={product.name}
              category={product.category.name}
                image={urlFor(product.image && product.image[0])}
              product={product}
              price={product.price}
              link={`/product/${product.slug.current}`}
            />
          ))}
          {console.log(products)}
        </div>
      </div>
    </div>
  );
};

export default Store;
