import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

// Get userId from token
const getUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    const decodeId = decoded.id;
    console.log(decodeId);
    return decodeId;
  }
  return null;
};

// ======================
// 🔁 Async Thunks
// ======================

// Fetch user cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const userId = getUserId();
  const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
  return res.data.items;
});

// Add product to cart
export const syncAddToCart = createAsyncThunk(
  "cart/syncAddToCart",
  async (product) => {
    const userId = getUserId();
    const res = await axios.post(`http://localhost:5000/api/cart/add`, {
      userId,
      product,
    });
    return res.data.items;
  }
);

// Remove item from cart
export const syncRemoveFromCart = createAsyncThunk(
  "cart/syncRemoveFromCart",
  async (productId) => {
    const userId = getUserId();
    const res = await axios.delete(
      `http://localhost:5000/api/cart/remove/${userId}/${productId}`
    );
    return res.data.cart.items;
  }
);

// Update item quantity
export const syncUpdateQuantity = createAsyncThunk(
  "cart/syncUpdateQuantity",
  async ({ id, delta }) => {
    const userId = getUserId();
    const res = await axios.patch(
      `http://localhost:5000/api/cart/update/${userId}/${id}`,
      {
        delta,
      }
    );
    return res.data.cart.items;
  }
);

// Clear cart
export const syncClearCart = createAsyncThunk(
  "cart/syncClearCart",
  async () => {
    const userId = getUserId();
    await axios.delete(`http://localhost:5000/api/cart/clear/${userId}`);
    return [];
  }
);

// ======================
// 🧠 Slice Definition
// ======================

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Optional: Local add to cart (if not syncing)
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncAddToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncRemoveFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncUpdateQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(syncClearCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
