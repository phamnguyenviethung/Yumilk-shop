/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

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
  },
});

export const { setCartData } = cart.actions;
export default cart.reducer;
