// Trong trang shop
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import Polular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductPopularThunkAction, fetchProductThunkAction } from "../slices/productsSlice";
import { loadingSelector } from "../redux-toolkit/selector";
import Spinner from "../components/Spinner/Spinner";
const Shop = () => {
  const dispatch = useDispatch()
  const loadingProducts = useSelector(loadingSelector)
  useEffect(() => {
    dispatch(fetchProductThunkAction())
  }, [])
  console.log('loading', loadingProducts)
  return (
    <>
      {
        loadingProducts === 'loading' ? <Spinner /> :
          (
            <div>
              <Hero />
              <Polular />
              <Offers />
              <NewCollections />
              <NewsLetter />
            </div>
          )
      }
    </>

  );
};

export default Shop;
