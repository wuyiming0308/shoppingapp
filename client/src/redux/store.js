import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import productsReducer from "./reducers/products";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
});

export default store;
