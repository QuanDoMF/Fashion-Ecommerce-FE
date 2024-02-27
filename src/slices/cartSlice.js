
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
      cartInfo: {
        subTotal: 0,
        shipping: 0,
        total: 0,
        status: 'draft'
      },
      cartDetails: [

      ]
  },
  reducers: {
    
      addToCart: (state, action) => {
        let cartItem = state.cartDetails.find((cartItem) => cartItem.id === action.payload.id)
        // console.log('cartitem', action.payload)
        if (cartItem?.id) { //existed
          cartItem.quantity = Number(cartItem.quantity) + 1
          cartItem.amount = Number(cartItem.quantity) * cartItem.new_price
        }
        else{
          state.cartDetails.push({
            ...action.payload,
            quantity: 1,
            amount: action.payload.new_price
          })
        }
        let newSubTotal = 0;
        for (let item of state.cartDetails) {
            newSubTotal += Number(item.amount)
        }
        state.cartInfo.subTotal = newSubTotal;
        state.cartInfo.total = state.cartInfo.subTotal + state.cartInfo.shipping
        
        // add to DB
        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/addtocart' ,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"cartItem" : action.payload}),
          })
          .then((res) => res.json())
          .then((data) => console.log(data))
        }
      },
      incrementQuantity: (state, action) => {
        let cartItem = state.cartDetails.find((cartItem) => cartItem.id === action.payload.id)
        cartItem.quantity = Number(cartItem.quantity) + 1
        cartItem.amount = Number(cartItem.quantity) * cartItem.new_price

        let newSubTotal = 0;
        for (let item of state.cartDetails) {
            newSubTotal += Number(item.amount)
        }
        state.cartInfo.subTotal = newSubTotal;
        state.cartInfo.total = state.cartInfo.subTotal + state.cartInfo.shipping
        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/incrementformcart' ,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"itemId" : action.payload.id}),
          })
          .then((res) => res.json())
          .then((data) => console.log(data))
        }
      },
    descrementQuantity: (state, action) => {
        let cartItem = state.cartDetails.find((cartItem) => cartItem.id === action.payload.id)
        cartItem.quantity = Number(cartItem.quantity) - 1
        cartItem.amount = Number(cartItem.quantity) * cartItem.new_price

        let newSubTotal = 0;
        for (let item of state.cartDetails) {
            newSubTotal += Number(item.amount)
        }
        state.cartInfo.subTotal = newSubTotal;
        state.cartInfo.total = state.cartInfo.subTotal + state.cartInfo.shipping
        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/descrementfromcart' ,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"itemId" : action.payload.id}),
          })
          .then((res) => res.json())
          .then((data) => console.log(data))
        }
      },
    removeCartItem: (state, action) => {
        state.cartDetails = state.cartDetails.filter((cartItem) => cartItem.id !== action.payload.id)
        let newSubTotal = 0;
        for (let item of state.cartDetails) {
            newSubTotal += Number(item.amount)
        }
        state.cartInfo.subTotal = newSubTotal;
        state.cartInfo.total = state.cartInfo.subTotal + state.cartInfo.shipping
        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/removefromcart' ,{
            method: 'POST',
            headers: {
              Accept: 'application/form-data',
              'auth-token': `${localStorage.getItem('auth-token')}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({"itemId" : action.payload.id}),
          })
          .then((res) => res.json())
          .then((data) => console.log(data))
        }
      },
      resetCart: (state, action) => {
        state.cartDetails = [];
        state.cartInfo = {
          subTotal: 0,
          shipping: 0,
          total: 0,
          status: 'draft'
        };
      },
  },
  extraReducers: (builder) => {
    builder
        .addCase(checkoutThunkAction.pending, (state, action) => {

        })
        .addCase(checkoutThunkAction.fulfilled, (state, action) => {
            state.cartDetails = []
            state.cartInfo = {
                subTotal: 0,
                shipping: 0,
                total: 0,
                status: 'draft'
            }
        })
        .addCase(fetchCartThunkAction.pending, (state, action) => {

        })
        .addCase(fetchCartThunkAction.fulfilled, (state, action) => {
          state.cartDetails = action.payload.data;
        })
    }
})


export const checkoutThunkAction = createAsyncThunk('cart/checkoutThunkAction', async (data) => {
    let orderRes = await fetch('http://localhost:4000/orderList', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    let result = await orderRes.json()
    return result;
})
export const fetchCartThunkAction = createAsyncThunk('cart/fetchCartThunkAction', async (req, res) => {
  try{  
  if(localStorage.getItem('auth-token')){
     let response = await fetch('http://localhost:4000/getcart' ,{
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
     const data = await response.json()
     return data
    }
  }catch(error){
    console.log(error)
  }
})
export default cartSlice
