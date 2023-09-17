import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../lib/client";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "categories"]{
          name, 
          _id,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      )
      .then((data) => {
        // Sort the categories alphabetically by name
        const sortedCategories = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCategories(sortedCategories);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-100 py-6 px-3">
      <div className="container mx-auto">
        <h4 className="font-playfair-display text-center font-bold lg:text-3xl py-2 text-2xl">
          All Categories
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="space-x-2 hover:text-primary font-semibold duration-300 rounded-full hover:shadow-md flex justify-center py-1.5"
            >
              <Link to={`/category/${category._id}`}>
                {category.name} <span>({category.productCount})</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
