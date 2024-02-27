import React, { useEffect, useState } from "react";
import './Css/ShopCategory.css'
import women_banner from "../components/Assets/banner_women.png"
import dropdown_icon from "../components/Assets/dropdown_icon.png"
import Item from "../components/Item/Item";
import { fetchProductLimitThunkAction } from "../slices/productsSlice";
import { productListSelector } from "../redux-toolkit/selector";
import { useSelector, useDispatch } from "react-redux";

const ShopCategoryMen = () => {
  const dispatch = useDispatch();
  const [displayedProducts, setDisplayedProducts] = useState(12);
  const [totalProducts, setTotalProducts] = useState(0);
  const selectProduct = useSelector(productListSelector);
  const allProducts = selectProduct.data;

  useEffect(() => {
    // Fetch sản phẩm chỉ với category là women và giới hạn sản phẩm bằng displayedProducts
    dispatch(fetchProductLimitThunkAction({ start: 0, limit: displayedProducts, category: 'men' }));
  }, [dispatch, displayedProducts]);

  useEffect(() => {
    if (allProducts) {
      setTotalProducts(allProducts.length);
    }
  }, [allProducts]);

  const handleLoadMore = (event) => {
    event.preventDefault();
    setDisplayedProducts(displayedProducts + 12);
  };

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={women_banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{totalProducts} of {totalProducts}</span> products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {allProducts?.map((item, i) => {
          if (item.category === 'men') {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>
      <div role='button' className="shopcategory-loadmore" onClick={(event) => handleLoadMore(event)}>
        Explore More
      </div>

    </div>
  );
};

export default ShopCategoryMen;