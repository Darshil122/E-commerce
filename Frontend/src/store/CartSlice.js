import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const res = await axios.get(`http://localhost:5000/cart/${userId}`);
  return res.data;
});

export const addToCart = createAsyncThunk("cart/addToCart", async (product) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await axios.post("http://localhost:5000/cart/add", {
    userId: user._id,
    productId: product._id,
  });
  return res.data.cart.items;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.patch("http://localhost:5000/cart/update", {
      userId: user._id,
      productId,
      quantity,
    });
    return res.data.items;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const res = await axios.delete("http://localhost:5000/cart/remove", {
      data: {
        userId: user._id,
        productId,
      },
    });
    return res.data.cart.items;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearFromDB",
  async (_, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await axios.delete(
      `http://localhost:5000/cart/clear/${user._id}`
    );
    return res.data.items;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

// export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
