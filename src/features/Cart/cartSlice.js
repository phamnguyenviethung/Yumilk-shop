/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const cartData = JSON.parse(localStorage.getItem('cartData')) || {
  data: {
    cartItems: {
      totalCount: 0,
      items: [],
    },
  },
};

const initialState = {
  data: cartData,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.data = action.payload;
      localStorage.setItem('cartData', JSON.stringify(cartData));
    },
    addToCart: (state, action) => {
      const target = state.data.cartItems.items.find(
        item => item.productId === action.payload.productID
      );

      if (!target) {
        state.data.cartItems.items.push(action.payload);
      } else {
        target.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      state.data.cartItems.items = state.data.cartItems.items.filter(
        item => item.productId !== action.payload.productID
      );
    },

    increaseQuantity: (state, action) => {
      const target = state.data.cartItems.items.find(
        item => item.productId === action.payload.productID
      );
      if (target) {
        target.quantity += action.payload.quantity;
      }
    },
  },
});

export const { setCartData, addToCart, increaseQuantity, removeFromCart } =
  cart.actions;
export default cart.reducer;
