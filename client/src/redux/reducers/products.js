import { ProductType } from "../actions/type";
import produce from "immer";
const intialState = {
  products: {},
};

const productsReducer = produce((state = intialState, { type, payload }) => {
  switch (type) {
    case ProductType.GET_PRODUCTS:
      state.products = {};
      payload.data.forEach((v) => {
        state.products[v._id] = v;
      });
      break;
    case ProductType.ADD_PRODUCT:
    case ProductType.EDIT_PRODUCT:
      const product = payload.data;
      state.products[product._id] = product;
      break;
    default:
      break;
  }
  return state;
});

export default productsReducer;
