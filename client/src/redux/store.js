import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productsReducer from "./reducers/products";
import cartReducer from "./reducers/cart";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
