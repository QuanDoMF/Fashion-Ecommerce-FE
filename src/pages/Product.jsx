import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrum/Breadcrum";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import { fetchProductThunkAction } from "../slices/productsSlice";
import { productListSelector } from "../redux-toolkit/selector";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('vào đây')
    dispatch(fetchProductThunkAction());
  }, [dispatch]);

  const selectProduct = useSelector(productListSelector);
  const all_product = selectProduct.data;
  const { productId } = useParams();
  const product = all_product?.find((e) => e.id === Number(productId));

  return (
    <div>
      {product && (
        <>
          <Breadcrum product={product} />
          <ProductDisplay product={product} />
        </>
      )}
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
