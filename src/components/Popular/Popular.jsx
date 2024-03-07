import React, { useEffect, useState } from "react";
import './Popular.css'
import Item from "../Item/Item";
import { useSelector } from "react-redux";
import { API_ROOT } from "../../utils/constants";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch(`${API_ROOT}/popular`);
        if (!response.ok) {
          throw new Error('Failed to fetch popular products');
        }
        const data = await response.json();
        setPopularProducts(data.data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;