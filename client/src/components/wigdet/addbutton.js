import styles from "./addbutton.module.css";

import { useDispatch, useSelector } from "react-redux";
import { addUserCart, editUserCart } from "../../redux/actions/cart";
const AddButton = (props) => {
  const count =
    useSelector((state) => state.cart.products[props.productId]) ?? 0;

  const dispatch = useDispatch();
  const increase = () => {
    dispatch(addUserCart(props.productId));
  };
  const decrease = () => {
    dispatch(editUserCart(props.productId));
  };
  return (
    <>
      {count >= 1 ? (
        <div className={styles.AddButton}>
          <button className={styles.ModifyButton} onClick={decrease}>
            -
          </button>
          <span className={styles.CountNumText}>{count}</span>
          <button className={styles.ModifyButton} onClick={increase}>
            +
          </button>
        </div>
      ) : (
        <button onClick={increase} className="AddProductButton">
          Add
        </button>
      )}
    </>
  );
};

export default AddButton;
