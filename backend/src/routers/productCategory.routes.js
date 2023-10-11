const express = require("express");
const dotenv = require("dotenv");
const { productCategoryController } = require("../controllers");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const productCategoryRouter = express();
productCategoryRouter.get("/", productCategoryController.getCategories);

module.exports = productCategoryRouter;