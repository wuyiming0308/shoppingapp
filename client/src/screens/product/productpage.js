import React, { useState } from "react";
import styles from "./productpage.module.css";
import { useNavigate } from "react-router-dom";

import { Input, InputType, InputButton } from "../../components/wigdet/input";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/actions/products";

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [currentUrl, setCurrentUrl] = useState("");

  const goToHomePage = async () => {
    dispatch(addProduct(product));
    navigate("/");
  };

  const changeName = (event) => {
    setProduct((e) => ({ ...e, name: event.target.value }));
  };

  const changeDescription = (event) => {
    setProduct((e) => ({ ...e, description: event.target.value }));
  };

  const changeCategory = (event) => {
    setProduct((e) => ({ ...e, category: event.target.value }));
  };

  const changeInStock = (event) => {
    setProduct((e) => ({ ...e, stock: event.target.value }));
  };
  const changePrice = (event) => {
    setProduct((e) => ({ ...e, price: event.target.value }));
  };

  const changeImageUrl = (event) => {
    setProduct((e) => ({ ...e, imageUrl: event.target.value }));
  };

  const uploadImage = (uploadImage) => {
    setCurrentUrl(product.imageUrl);
  };

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.ProductHeader}>
          <span>
            <h1 className={styles.HomePageTitle}>Create Product</h1>
          </span>
        </div>
        <div className={styles.ContentContainer}>
          <Input
            htmlFor="input"
            label="Product name"
            placeholder="Enter the product name"
            value={product.name}
            onChange={changeName}
            width="100%"
            inputType={InputType.INPUT}
          />
          <Input
            width="100%"
            label="Description"
            value={product.description}
            onChange={changeDescription}
            placeholder="Enter the product description"
            inputType={InputType.TEXTAREA}
          />
          <div className={styles.SubButtonContainerOne}>
            <Input
              htmlFor="input"
              label="Category"
              placeholder="Enter the product name"
              value={product.category}
              onChange={changeCategory}
              inputType={InputType.INPUT}
            />{" "}
            <Input
              htmlFor="input"
              label="Price"
              placeholder="Enter the product name"
              value={product.price}
              onChange={changePrice}
              inputType={InputType.INPUT}
            />
          </div>

          <div className={styles.SubButtonContainerTwo}>
            <Input
              htmlFor="input"
              label="In Stock Quantity"
              placeholder="Enter the product count"
              value={product.stock}
              onChange={changeInStock}
              inputType={InputType.INPUT}
            />{" "}
            <InputButton
              label="Add Image Link"
              placeholder="enter the image link"
              onChange={changeImageUrl}
              value={product.imageUrl || ""}
              onClick={uploadImage}
              button="update image"
            />
          </div>

          <div className={styles.ImagePreview}>
            <img
              alt="product"
              className={styles.ImagePreviewContent}
              src={currentUrl}
            />
          </div>
          <div className={styles.AddProductButtonContainer}>
            <button className={styles.AddProductButton} onClick={goToHomePage}>
              Add Product
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
