
import React, { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Polular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
import NewsLetter from "../components/NewsLetter/NewsLetter";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Polular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  )
}
export default Shop