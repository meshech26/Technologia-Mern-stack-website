import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // ✅ Import it

const store = configureStore({
  reducer: {
    cart: cartReducer, // ✅ Register it
  },
});

export default store;
