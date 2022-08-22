import styles from "./cartcontent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addUserCart, editUserCart } from "../../../redux/actions/cart";
import { useCallback, useRef, useState } from "react";
const CartItem = (props) => {
  const { prodcut, count, products } = props;

  const dispatch = useDispatch();
  const increase = () => {
    dispatch(addUserCart(products));
  };
  const decrease = () => {
    dispatch(editUserCart(products));
  };

  return (
    <div className={styles.CartItem}>
      <div className={styles.imagebox}>
        <img
          src={prodcut.imageUrl}
          className={styles.image}
          alt={prodcut.name}
        />
      </div>
      <div className={styles.about}>
        <div className={styles.ItemInfo}>
          <span className={styles.title}>{prodcut.name}</span>
          <div className="amount">${prodcut.price}</div>
        </div>
        <div className={styles.ButtonContainer}>
          <div className={styles.ModifyButtonContainer}>
            <button className={styles.ModifyButton} onClick={increase}>
              +
            </button>
            <span className={styles.ItemCount}>{count}</span>
            <button className={styles.ModifyButton} onClick={decrease}>
              -
            </button>
          </div>
          <button className={styles.RemoveProductButton}>remove</button>
        </div>
      </div>
    </div>
  );
};

const CartContent = (props) => {
  const [useDiscount, setUseDiscount] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const handleOnClick = () => {
    if (inputCode === "DISCOUNT") {
      setUseDiscount(true);
    } else {
      setUseDiscount(false);
    }
  };

  const Code = (event) => {
    setInputCode(event.target.value);
  };

  const { products } = useSelector((state) => state.products);
  const renderItemList = () => {
    return Object.entries(props.products).map(([k, v]) => {
      return v > 0 ? (
        <CartItem
          count={v}
          prodcut={products[k]}
          key={products[k]._id}
          products={k}
        />
      ) : undefined;
    });
  };

  let sum = useRef(0);
  let discount = useRef(0);
  let tax = useRef(0);

  const DiscountPrice = useCallback(() => {
    if (useDiscount) {
      discount.current = sum.current * 0.01;
    } else {
      discount.current = 0;
    }
    return discount.current.toFixed(2);
  }, [sum, useDiscount]);

  const calculatePrice = useCallback(() => {
    sum.current = 0;
    Object.entries(props.products).forEach(([k, v]) => {
      sum.current += products[k].price * v;
    });
    return sum.current;
  }, [props, products]);

  const taxPrice = useCallback(() => {
    tax.current = sum.current * 0.0725;
    return tax.current.toFixed(2);
  }, [sum]);

  const total = useCallback(() => {
    if (useDiscount) {
      return (sum.current + tax.current - discount.current).toFixed(2);
    } else {
      return (sum.current + tax.current).toFixed(2);
    }
  }, [sum, tax, discount, useDiscount]);

  return (
    <>
      {<div className={styles.ItermList}>{renderItemList()}</div>}

      <div>
        <div>
          <hr></hr>
          <div className={styles.DiscountCode}>
            <span className={styles.TextOne}>Apply DisCount Code</span>
            <input
              className={styles.CodeInput}
              placeholder="Discount Code"
              value={inputCode}
              onChange={Code}
            ></input>
            <button className={styles.ApplyButton} onClick={handleOnClick}>
              Apply
            </button>
          </div>
          <hr></hr>
          <div>
            <div className={styles.SubTotalInfo}>
              <span>SubTotal</span>
              <span>${calculatePrice()}</span>
            </div>
            <div className={styles.TaxInfo}>
              <span>Tax</span>
              <span>${taxPrice()}</span>
            </div>
            {useDiscount ? (
              <div className={styles.DiscountInfo}>
                <span>Discount</span>
                <span>-${DiscountPrice()}</span>
              </div>
            ) : null}

            <div className={styles.TotalInfo}>
              <span>Total</span>
              <span>${total()}</span>
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
