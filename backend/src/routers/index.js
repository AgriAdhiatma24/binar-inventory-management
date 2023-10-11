const express = require("express");
const productRouter = require("./product.routes");
const productCategoryRouter = require("./productCategory.routes")
const { productModel } = require("../models");

const API_PATH = process.env.API_PATH;
const PRODUCT_PATH_V1 = `${API_PATH}/product`;
const CATEGORY_PATH_V1 = `${API_PATH}/product-category`;
const appRouter = express();

appRouter.use(`${PRODUCT_PATH_V1}`, productRouter);
appRouter.use(`${CATEGORY_PATH_V1}`, productCategoryRouter)

module.exports = appRouter;
