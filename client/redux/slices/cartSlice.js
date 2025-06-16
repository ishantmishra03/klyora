import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios'; 

// Get Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await axios.get('/api/cart');
  return res.data.cart;
});

// Add or update (increment/decrement) cart item
export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ productId, action }) => {
    const res = await axios.post('/cart/add', { productId, action });
    return res.data.cart;
  }
);

// Remove item
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId) => {
    const res = await axios.post('/cart/remove', { productId });
    return res.data.cart;
  }
);

// Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const res = await axios.delete('/cart/clear');
  return res.data.cart;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
