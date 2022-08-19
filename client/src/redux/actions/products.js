import { ProductType } from "./type";
import {
  addProductRequest,
  getProductsRequest,
  editProductRequest,
} from "../../data/requestservice";

const getProducts = async (dispatch) => {
  const data = await getProductsRequest();
  if (data.success) {
    dispatch({
      type: ProductType.GET_PRODUCTS,
      payload: data,
    });
  }
};

const addProduct = (product) => async (dispatch) => {
  const data = await addProductRequest(product);
  if (data.success) {
    dispatch({
      type: ProductType.ADD_PRODUCT,
      payload: data,
    });
  }
};

const editProduct = (product) => async (dispatch) => {
  const data = await editProductRequest(product);
  if (data.success) {
    dispatch({
      type: ProductType.EDIT_PRODUCT,
      payload: data,
    });
  }
};
export { getProducts, addProduct, editProduct };
