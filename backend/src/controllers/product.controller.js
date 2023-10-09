const { productModel } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");

getAllProducts = async (_req, res) => {
  try {
    const products = await productModel.loadProducts();
    const mapProducts = products.map((product) => ({
      ...product,
      price: parseFloat(product.price),
    }));
    return res
      .status(200)
      .json(okResp("Sucessfully fetching all products", mapProducts));
  } catch (e) {
    console.error("Error fetching products: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await productModel.editProduct(productId, updatedData)
    return res
      .status(200)
      .json(okResp("Successfully updated product", updatedProduct));
  } catch (e) {
    console.error("Error updating product: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
}

module.exports = { getAllProducts, updateProduct };
