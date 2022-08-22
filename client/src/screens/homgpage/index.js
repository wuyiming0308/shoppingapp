import React, { useState } from "react";
import { membershipRole } from "../../data/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pagination } from "antd";

import "./index.css";

import AddButton from "../../components/wigdet/addbutton";
import BuggyCounter from "../../components/errorBoundaries/BuggyCounter";
import MyErrorBoundary from "../../components/errorBoundaries/MyErrorBoundary";

const pageSize = 12;

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
        <AddButton productId={prod["_id"]} />
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
  const [currentPage, setCurretPage] = useState(0);

  const products = useSelector((state) =>
    Object.values(state.products.products)
  );

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
    return products
      .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
      .map((v) => (
        <Item
          prod={v}
          goToPoductDetail={goToPoductDetail}
          goToEditPage={goToEditPage}
          key={v._id}
        />
      ));
  };

  return (
    <MyErrorBoundary>
      <div className="ProductContainer">
        <div className="ProductHeader">
          <span>
            <BuggyCounter />
          </span>
          <div>
            {user && user.role === membershipRole.ROLE_SELLER ? (
              <button className="AddNewProductButton" onClick={goToProductPage}>
                Add Product
              </button>
            ) : null}
          </div>
        </div>
        {<div className="ItemsContainer">{renderItemList()}</div>}
        <div className="PaginationContain">
          <Pagination
            defaultCurrent={1}
            pageSize={pageSize}
            total={products.length}
            onChange={(e) => setCurretPage(e - 1)}
          />
        </div>
      </div>
    </MyErrorBoundary>
  );
};

export default Content;
