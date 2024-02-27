import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: 'productList',
  initialState: {
    status: 'idle',
    products: [],
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductThunkAction.pending , (state, action) => {
          state.status = 'loading'
      })
      .addCase(fetchProductThunkAction.fulfilled , (state, action) => {
        state.status = 'idle'
        state.products = action.payload
      })
      .addCase(fetchProductLimitThunkAction.pending, (state, action) => {
        state.status = 'loading';
    })
    .addCase(fetchProductLimitThunkAction.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
    })
    .addCase(fetchProductLimitThunkAction.rejected, (state, action) => {
        state.status = 'error';
    })
  }
})
export const fetchProductThunkAction = createAsyncThunk('productList/fetchProductThunkAction', async () => {
  let productListRes = await fetch('http://localhost:4000/allproduct')
  let data = await productListRes.json()
  return data;
})
export const fetchProductLimitThunkAction = createAsyncThunk('productList/fetchProductLimitThunkAction', async ({ start, limit, category }) => {
  try {
    let url = `http://localhost:4000/allproduct?start=${start}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

export default productsSlice