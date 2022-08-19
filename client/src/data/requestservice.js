const url = "http://localhost:3002";

const loginRequest = async ({ password, email }) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

const registerRequest = async ({ password, email }) => {
  const response = await fetch(`${url}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, email }),
  });
  const data = await response.json();
  return data;
};

/** Product related APIs */
const getProductsRequest = async () => {
  const response = await fetch(`${url}/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const addProductRequest = async (product) => {
  const response = await fetch(`${url}/products/createproduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};

const editProductRequest = async (product) => {
  const response = await fetch(`${url}/products/editproduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...product, category: product.category.name }),
  });
  const data = await response.json();
  return data;
};

export {
  addProductRequest,
  editProductRequest,
  getProductsRequest,
  loginRequest,
  registerRequest,
};
