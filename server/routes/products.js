const express = require("express");
const { addproduct, editproduct } = require("../controllers/productcontroller");
const router = express.Router();
const { ProductModel, ProductCategoryModel } = require("../model/product");
const url = require("url");

/* Handle add, edit product request. */
router.post("/createproduct", async (req, res, next) => {
  const { name, price, category, stock, description, imageUrl } = req.body;
  if (!name || !price || !category) {
    return res.json(
      requestFailed(
        "please enter all required information and try again" +
          name +
          price +
          category
      )
    );
  }
  let exsitingCategory = null;
  try {
    exsitingCategory = await ProductCategoryModel.findOne({
      name: category,
    });
    if (exsitingCategory) {
      const productExisit = await ProductModel.findOne({
        name,
        category: exsitingCategory,
      });

      if (productExisit) {
        return res.json(requestFailed("product already exsits"));
      }
    } else {
      const newCategory = new ProductCategoryModel({ name: category });
      exsitingCategory = await newCategory.save();
    }

    const product = new ProductModel({
      name,
      price,
      category: exsitingCategory,
      stock,
      description,
      imageUrl,
    });

    const savedProduct = await product.save();
    return res.json(requestSuccess(savedProduct));
  } catch (err) {
    return res.json(err + "1");
  }
});

// eidt product
router.post("/editproduct", async (req, res, next) => {
  const { _id, name, description, price, stock, imageUrl, category } = req.body;

  let exisitedCategory = await ProductCategoryModel.findOne({
    name: category,
  });

  if (exisitedCategory) {
    const exisitingProductInNewCategory = await ProductModel.findOne({
      name,
      category: exisitedCategory,
    });

    if (
      exisitingProductInNewCategory &&
      exisitingProductInNewCategory._id != _id
    ) {
      return res.json(
        requestFailed(
          "can not update this to the new category because there is already one product with same name"
        )
      );
    }
  } else {
    exisitedCategory = await ProductCategoryModel.create({
      name: category,
    });
  }

  const updateResult = await ProductModel.findOneAndUpdate(
    { _id: _id },
    {
      name,
      description,
      price,
      stock,
      imageUrl,
      category: exisitedCategory,
    },
    { new: true }
  );

  return res.json(requestSuccess(updateResult));
});

//find product by category
router.get("/", async (req, res, next) => {
  try {
    let allProducts = null;

    const queryObject = url.parse(req.url, true).query;
    if (queryObject.category != null) {
      const findCategory = await ProductCategoryModel({
        name: queryObject.category,
      });
      if (findCategory) {
        allProducts = await ProductModel.find({
          category: findCategory,
        }).populate("category");
        return res.json(requestSuccess(allProducts));
      }
    }
    allProducts = await ProductModel.find({}).populate("category");

    return res.json(requestSuccess(allProducts));
  } catch (err) {
    return res.json(requestFailed("Error occus when getting all products"));
  }
});

// get all category
router.get("/category", async (req, res, next) => {
  try {
    const allProducts = await ProductCategoryModel.find({});
    return res.json(requestSuccess(allProducts));
  } catch (err) {
    return res.json(requestFailed("Error occus when getting all category"));
  }
});

// delete all product
router.delete("/", async (req, res, next) => {
  try {
    const deleteProducts = await ProductModel.deleteMany({});
    return res.json(requestSuccess(deleteProducts));
  } catch (err) {
    return res.json(requestFailed("Error occus when delete all products"));
  }
});

function requestFailed(error) {
  return { success: false, error };
}

function requestSuccess(data) {
  return { success: true, data };
}
module.exports = router;
