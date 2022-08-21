import styles from "./cartcontent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../../redux/actions/cart";

const CartItem = (props) => {
  const { products, count } = useSelector((state) => state.cart);
  const url = `data:image/jpeg;base64,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`;

  return (
    <div className={styles.CartItem}>
      <div className={styles.imagebox}>
        <img src={url} className={styles.image} />
      </div>
      <div className={styles.about}>
        <div className={styles.ItemInfo}>
          <span className={styles.title}>{products}</span>
          <div className="amount">$2.99</div>
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.ModifyButtonContainer}>
            <button className={styles.ModifyButton}>+</button>
            <span className={styles.ItemCount}>{count}</span>
            <button className={styles.ModifyButton}>-</button>
          </div>
          <button className={styles.RemoveProductButton}>remove</button>
        </div>
      </div>
    </div>
  );
};

const CartContent = (props) => {
  const products = useSelector((state) => state.products);
  const renderItemList = () => {
    return Object.values(products).map((v) => (
      <CartItem prod={v} key={v._id} />
    ));
  };
  return (
    <>
      {<div>{renderItemList()}</div>}

      <div>
        <div>
          <hr></hr>
          <div className={styles.DiscountCode}>
            <span className={styles.TextOne}>Apply DisCount Code</span>
            <input
              className={styles.CodeInput}
              placeholder="Discount Code"
            ></input>
            <button className={styles.ApplyButton}>Apply</button>
          </div>
          <hr></hr>
          <div>
            <div className={styles.SubTotalInfo}>
              <span>SubTotal</span>
              <span>$</span>
            </div>
            <div className={styles.TaxInfo}>
              <span>Tax</span>
              <span>$</span>
            </div>
            <div className={styles.DiscountInfo}>
              <span>Discount</span>
              <span>$</span>
            </div>
            <div className={styles.TotalInfo}>
              <span>Total</span>
              <span>$</span>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <button className={styles.CheckOutButton}>
        <span>Check Out</span>
      </button>
    </>
  );
};

export default CartContent;
