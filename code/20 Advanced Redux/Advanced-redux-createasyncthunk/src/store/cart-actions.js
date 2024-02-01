import { createAsyncThunk } from "@reduxjs/toolkit";

// "https://redux-project-51d02-default-rtdb.firebaseio.com/cart.json"

export const fetchCartData = createAsyncThunk("cart/fetchData", async () => {
  const response = await fetch(
    "https://redux-project-51d02-default-rtdb.firebaseio.com/cart.json"
  );
  if (!response.ok) {
    throw new Error("Fetching cart items failed.");
  }

  const data = await response.json();

  return {
    items: data?.items || [],
    totalQuantity: data?.totalQuantity || 0
  };
});

export const sendCartData = createAsyncThunk("cart/sendData", async cart => {
  const config = {
    method: "PUT",
    body: JSON.stringify({
      items: cart.items,
      totalQuantity: cart.totalQuantity
    })
  };

  const response = await fetch(
    "https://redux-project-51d02-default-rtdb.firebaseio.com/cart.json",
    config
  );

  if (!response.ok) {
    throw new Error("Sending cart failed");
  }
});
