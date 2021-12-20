const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require('./products');
const transactionSchema = new mongoose.Schema({});
const Transaction = mongoose.model("Transaction", transactionSchema);

const populateTransactions = async (limit = 1) => {
  let topTransactions = await Transaction.aggregate([
    {
      $group: {
        _id: "$ProductID",
        total: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
  ])
    .sort({ total: -1 })
    .limit(limit);
  console.log(topTransactions[0].product)
  return topTransactions;
};

exports.populateTransactions = populateTransactions;
