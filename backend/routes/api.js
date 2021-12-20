const express = require("express");
const router = express.Router();
const Products = require("../models/products");

router.get("/products/top", async (req, res, next) => {
  try {
    let topProduct = await Products.getTopProduct();
    res.json(topProduct);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/products/:id/edit", async (req, res, next) => {
  
  try {
    let product = await Products.editProduct(req.body);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
})

router.get("/products/popular", async (req, res, next) => {
  try {
    let popularProducts = await Products.getPopular();
    // console.log(popularProducts);
    res.json(popularProducts);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
