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
// import Spinner from "../components/Spinner/Spinner";
const Shop = () => {
  return (
    <div>
      <Hero />
      <Polular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;
