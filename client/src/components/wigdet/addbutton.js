import { useState } from "react";
import styles from "./addbutton.module.css";

const AddButton = () => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };
  return (
    <>
      {count >= 1 ? (
        <div className={styles.AddButton}>
          <button className={styles.ModifyButton} onClick={decrease}>
            -
          </button>
          <h3 className={styles.CountNumText}>{count}</h3>
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
