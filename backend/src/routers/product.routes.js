const express = require("express");
const dotenv = require("dotenv");
const { productController } = require("../controllers");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const productRouter = express();
productRouter.get("/products", productController.getAllProducts);
productRouter.put("/:id", productController.updateProduct);

module.exports = productRouter;
