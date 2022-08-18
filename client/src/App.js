import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import "./App.css";

import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Content from "./screens/homgpage/index";
import ProductPage from "./screens/product/productpage";
import ProductDetailPage from "./screens/productdetailpage/productedetailpage";
import EditProductPage from "./screens/editproductpage/editproductpage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState(new Map());

  useEffect(() => {
    console.log("i fire once");
    fetch("http://localhost:3002/products")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const map = new Map();
          data.data.forEach((v) => {
            map.set(v["_id"], v);
          });
          setProducts(map);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  const addProduct = async (product) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product }),
      };

      const response = await fetch(
        "http://localhost:3002/products/createproduct",
        requestOptions
      );
      const data = await response.json();

      if (data.success) {
        setProducts(new Map(products.set(data.data["_id"], data.data)));

        console.log(products);
      }
    } catch (err) {
      console.log(err);
    }
    return Promise.resolve();
  };

  const editProduct = async (product) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product }),
      };

      const response = await fetch(
        "http://localhost:3002/products/editproduct",
        requestOptions
      );
      const data = await response.json();

      if (data.success) {
        console.log(data);
        setProducts(new Map(products.set(data.data["_id"], data.data)));
      }
    } catch (err) {
      console.log(err);
    }
    return Promise.resolve();
  };

  return (
    <>
      <Layout>
        <Header />
        <div className="AppsContainer">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Content products={products} />} />
              <Route
                path="/create-product"
                element={<ProductPage addProduct={addProduct} />}
              />
              <Route path="*" exact={true} element={<Content />} />
              <Route path="/product-detail" element={<ProductDetailPage />} />
              <Route
                path="/edit-product"
                element={<EditProductPage editProduct={editProduct} />}
              />
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export default App;
