import { createSelector } from "@reduxjs/toolkit";
export const productListSelector = (state) => state.productList.products
export const loadingSelector = (state) => state.productList.status
export const cartSelector = (state) => state.cart
export const orderListSelector = (state) => state.orders.orderList

