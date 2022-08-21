import { CartType } from "./type";
import {
  getUserCartRequest,
  addUserCartRequest,
  editUserCartRequest,
} from "../../data/requestservice";

const getUserCart = async (dispatch) => {
  const data = await getUserCartRequest();
  if (data.success) {
    dispatch({
      type: CartType.GET_USERCART,
      payload: data,
    });
  }
};

const addUserCart = (productId) => async (dispatch) => {
  const data = await addUserCartRequest(productId);
  if (data.success) {
    dispatch({
      type: CartType.ADD_CART,
      payload: {
        productId: productId,
      },
    });
  }
};

const editUserCart = (productId) => async (dispatch) => {
  const data = await editUserCartRequest(productId);
  if (data.success) {
    dispatch({
      type: CartType.EDIT_CART,
      payload: { productId: productId },
    });
  }
};
export { getUserCart, addUserCart, editUserCart };
