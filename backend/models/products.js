const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NodeCache = require("node-cache");
const productSchema = new mongoose.Schema({});
const Product = mongoose.model("Product", productSchema);
const uuid = require("uuid");
const cache = new NodeCache();
const Transactions = require("./transactions");

const cacheTime = 60000;

const getPopular = async () => {
  if (cache.get("popularProducts") !== undefined) {
    return cache.get("popularProducts");
  }
  let numProducts = 5;
  let products = await Transactions.populateTransactions(numProducts);
  let popular;
  try {
    popular = products.map((transaction) => {
      let product = transaction.product[0];
      product.grossSales = transaction.total;
      return product;
    });   

    cache.set("popularProducts", popular, cacheTime);
    cache.set("topProduct", popular[0], cacheTime);

  } catch (error) {
    console.log(error);
    popular = {};
  }
  
  return popular;
};

const getTopProduct = async () => {
  if (cache.get("topProduct") !== undefined) {
    return cache.get("topProduct");
  }

  let sortedProducts = await Transactions.populateTransactions(1);
  let grossSales = sortedProducts[0].total;
  let topProduct;
  try {
    topProduct = sortedProducts[0].product[0];
    topProduct.grossSales = grossSales;

    cache.set("topProduct", topProduct, cacheTime);

  } catch (error) {
    console.log(error);
    topProduct = {};
  }
  return topProduct;
};

const editProduct = async (product) => {
  // console.log(uuid(product))
  // console.log(uuid.v4(product.id));
  try {
  let editedProduct = await Product.findByIdAndUpdate(
    { _id: product._id },
    product,
    { new: true }
    );
  

  cache.del("popularProducts");
  cache.del("topProduct");

  return editedProduct;
  } catch (error) {
    console.log(error);
    return {};
  }
}

exports.getPopular = getPopular;
exports.getTopProduct = getTopProduct;
exports.editProduct = editProduct;