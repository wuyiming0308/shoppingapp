import styles from "./productdetail.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import AddButton from "../../components/wigdet/addbutton";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state.product;
  const goToHomePage = () => {
    navigate("/");
  };
  const goToEditPage = (product) => {
    navigate("/edit-product", { state: { product: product } });
  };
  return (
    <>
      {" "}
      {product && (
        <div className={styles.Container}>
          <div className={styles.ProductHeader}>
            <span>
              <h1 className={styles.HomePageTitle} onClick={goToHomePage}>
                Product Detail{" "}
              </h1>
            </span>
          </div>
          <div className={styles.ContentContainer}>
            <img
              className={styles.ImgContainer}
              alt={product.name}
              src={product.imageUrl}
            ></img>
            <div className={styles.ProductDetailContainer}>
              <label>{product.category.name}</label>
              <h1>{product.name}</h1>
              <h2>{product.price}</h2>
              <p>{product.description}</p>
              <br />
              <div className="ProductButtons">
                <AddButton />
                <button
                  className="EditProductButton"
                  onClick={() => {
                    goToEditPage(product);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
