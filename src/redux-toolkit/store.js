import { configureStore} from "@reduxjs/toolkit"
import cartSlice from "../slices/cartSlice"
import orderSlice from "../slices/orderSlice"
import productsSlice from "../slices/productsSlice"
import authSlice from "../slices/authSlice"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    productList: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: orderSlice.reducer,
  }
})
export default store