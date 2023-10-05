const express = require("express");
const productRouter = require("./product.routes");
const { productModel } = require("../models");

const API_PATH = process.env.API_PATH;
const PRODUCT_PATH_V1 = `${API_PATH}/product`;
const appRouter = express();

// console.log(productModel.loadProducts()); //->Promise Pending
appRouter.use(`${PRODUCT_PATH_V1}`, productRouter);

module.exports = appRouter;
