import React, { useEffect } from "react";

import { Layout } from "antd";
import "./App.css";
import { useDispatch } from "react-redux";
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Content from "./screens/homgpage/index";
import ProductPage from "./screens/product/productpage";
import ProductDetailPage from "./screens/productdetailpage/productedetailpage";
import EditProductPage from "./screens/editproductpage/editproductpage";

import { Routes, Route } from "react-router-dom";
import { getProducts } from "./redux/actions/products";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Header />
        <div className="AppsContainer">
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/create-product" element={<ProductPage />} />
            <Route path="*" exact={true} element={<Content />} />
            <Route path="/product-detail" element={<ProductDetailPage />} />
            <Route path="/edit-product" element={<EditProductPage />} />
          </Routes>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
