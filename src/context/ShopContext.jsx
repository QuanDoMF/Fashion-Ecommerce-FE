import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {}
//   for (let i = 0; i < 300 + 1; i++) {
//     cart[i] = 0;
//   }
//   return cart;
// }
const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([])
  // const [cartItems, setCartItem] = useState(getDefaultCart())

  useEffect(() => {
    console.log('fetchProduct')
    fetch('http://localhost:4000/allproduct')
      .then((res) => (
        res.json()
      ))
      .then((data) => {
        setAll_Product(data.data)
      })
  }, [])

  // const addToCart = (itemId) => {
  //   setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
  //   // console.log("cartItems", cartItems)
  // }
  // const removeFromCart = (itemId) => {
  //   setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  // }

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       let itemInfo = all_product.find((product) => product.id === Number(item))
  //       totalAmount += itemInfo.new_price * cartItems[item]
  //     }
  //   }
  //   return totalAmount
  // }

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item]
  //     }
  //   }
  //   return totalItem
  // }

  const contextValue = { all_product }
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider