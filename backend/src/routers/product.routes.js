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
productRouter.get("/:id", productController.getOneProduct);
productRouter.get(
  "/products/category/:categoryID",
  productController.getProductByCategory
);
productRouter.get("/products/count", productController.getTotalProductCount);
productRouter.get(
  "/products/store-values",
  productController.getTotalStoreValue
);
productRouter.get(
  "/products/out-of-stock",
  productController.getOutOfStockItemsWithCount
);
productRouter.post("/add", productController.insertProductController);
productRouter.delete("/:id", productController.deleteProductController);

module.exports = productRouter;
