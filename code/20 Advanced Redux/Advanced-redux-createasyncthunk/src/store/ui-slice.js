import { createSlice } from "@reduxjs/toolkit";
import { fetchCartData, sendCartData } from "./cart-actions";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      };
    }
  },
  extraReducers: {
    [fetchCartData.rejected]: (state, action) => {
      state.notification = {
        status: "error",
        title: "Error",
        message: action.error.message || "Fetching cart failed"
      };
    },
    [sendCartData.pending]: state => {
      state.notification = {
        status: "",
        title: "Pending",
        message: "sending..."
      };
    },
    [sendCartData.fulfilled]: state => {
      state.notification = {
        status: "success",
        title: "Success!",
        message: "Cart data sent successfully!"
      };
    },
    [sendCartData.rejected]: (state, action) => {
      state.notification = {
        status: "error",
        title: "Error!",
        message: "Failed to send cart data!"
      };
    }
  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;
