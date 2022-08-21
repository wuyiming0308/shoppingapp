import { CartType } from "../actions/type";
import produce from "immer";
const intialState = {
  products: {},
  count: 0,
};

const cartReducer = produce((state = intialState, { type, payload }) => {
  switch (type) {
    case CartType.GET_USERCART:
      const { products, count } = payload.data;
      state.products = products;
      state.count = count;
      return state;
    case CartType.ADD_CART:
      state.products[payload.productId] =
        (state.products[payload.productId] ?? 0) + 1;
      state.count += 1;
      return state;
    case CartType.EDIT_CART:
      state.products[payload.productId] =
        (state.products[payload.productId] ?? 0) - 1;
      state.count -= 1;
      return state;
    default:
      return state;
  }
});

export default cartReducer;
