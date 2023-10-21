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

getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.getSingleProduct(id);
    product.price = parseFloat(product.price);
    return res
      .status(200)
      .json(okResp("Sucessfully fetching one product", product));
  } catch (e) {
    console.error("Error fetching product: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await productModel.editProduct(
      productId,
      updatedData
    );
    return res
      .status(200)
      .json(okResp("Successfully updated product", updatedProduct));
  } catch (e) {
    console.error("Error updating product: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

insertProductController = async (req, res) => {
  try {
    const { name, price, stock_amount, image_url, category_id } = req.body;

    const newProductData = {
      name,
      price,
      stock_amount,
      image_url,
      category_id,
    };
    const addedProduct = await productModel.addProduct(newProductData);

    return res
      .status(200)
      .json(okResp("Successfully add new Product", addedProduct));
  } catch (error) {
    console.error("Error adding product:", error.message);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await productModel.deleteProduct(productId);

    res.status(200).json(okResp(`Successfully delete ${result}`, addedProduct));
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

module.exports = {
  deleteProductController,
  insertProductController,
  getAllProducts,
  getOneProduct,
  updateProduct,
};
