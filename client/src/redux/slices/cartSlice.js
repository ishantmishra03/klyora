import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axios';
import { toast } from 'react-hot-toast';

// Get Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await axios.get('/api/cart');
  return res.data.cart;
});

// Add to cart (only if not already in cart)
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.post('/api/cart/add', { productId });
      if (res.data.success) toast.success(res.data.message);
      return res.data.cart;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

//  Increment quantity
export const incrementCartItem = createAsyncThunk(
  'cart/incrementCartItem',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.post('/api/cart/inc1', { productId });
      if (res.data.success) toast.success(res.data.message);
      return res.data.cart;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to increment');
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// 🔽 Decrement quantity
export const decrementCartItem = createAsyncThunk(
  'cart/decrementCartItem',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.post('/api/cart/dec1', { productId });
      if (res.data.success) toast.success(res.data.message);
      return res.data.cart;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to decrement');
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Remove item completely
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId, thunkAPI) => {
    try {
      const res = await axios.post('/api/cart/remove', { productId });
      if (res.data.success) toast.success(res.data.message);
      return res.data.cart;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove');
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk('cart/clearCart', async (_, thunkAPI) => {
  try {
    const res = await axios.delete('/api/cart/clear');
    if (res.data.success) toast.success(res.data.message);
    return res.data.cart;
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to clear cart');
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// Slice
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
      // fetch
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // add
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // increment
      .addCase(incrementCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // decrement
      .addCase(decrementCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // remove
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })

      // clear
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
