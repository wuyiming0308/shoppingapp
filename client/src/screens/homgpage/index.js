import React from "react";
import { membershipRole } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

import AddButton from "../../components/wigdet/addbutton";

const Item = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { prod, goToPoductDetail, goToEditPage } = props;

  return (
    <div className="ProductItem" key={prod["_id"]}>
      <div className="ImageContainer" onClick={() => goToPoductDetail(prod)}>
        <img className="ProductImage" src={prod.imageUrl} alt={prod.name} />
      </div>
      <div className="ProductName">{prod.name}</div>
      <div className="ProductPrice">{prod.price}</div>
      <div className="ProductButtons">
        <AddButton />
        {user && user.role === membershipRole.ROLE_SELLER ? (
          <button
            className="EditProductButton"
            onClick={() => goToEditPage(prod)}
          >
            Edit
          </button>
        ) : null}
      </div>
    </div>
  );
};

const Content = () => {
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const goToProductPage = () => {
    navigate("/create-product");
  };
  const goToPoductDetail = (prod) => {
    navigate("/product-detail", { state: { product: prod } });
  };
  const goToEditPage = (prod) => {
    navigate("/edit-product", { state: { product: prod } });
  };
  const renderItemList = () => {
    return Object.values(products).map((v) => (
      <Item
        prod={v}
        goToPoductDetail={goToPoductDetail}
        goToEditPage={goToEditPage}
        key={v._id}
      />
    ));
  };

  return (
    <div className="ProductContainer">
      <div className="ProductHeader">
        <span>
          {" "}
          <h1 className="HomePageTitle">Products</h1>
        </span>
        <div>
          <select>
            <option>Price:low to high</option>
            <option>last added</option>
            <option>price: high to low</option>
          </select>

          {user && user.role === membershipRole.ROLE_SELLER ? (
            <button onClick={goToProductPage}>Add Product</button>
          ) : null}
        </div>
      </div>
      {<div className="ItemsContainer">{renderItemList()}</div>}
    </div>
  );
};

export default Content;
