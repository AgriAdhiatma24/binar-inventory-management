const { productModel } = require("../models");
const { getCategoryNameIdMapping } = require("../models/product.model");
const { errorResp, okResp } = require("../utils/responseHandlers");
const uuid = require("uuid");

const getAllProducts = async (_req, res) => {
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

const getOneProduct = async (req, res) => {
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

const getProductByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryID;
    const products = await productModel.getProductsByCategory(categoryId);
    return res
      .status(200)
      .json(okResp("Sucessfully fetching product", products));
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const categoryMap = await getCategoryNameIdMapping();
    const category_id = categoryMap[updatedData.category_name];

    updatedData.category_id = category_id;
    delete updatedData.category_name;

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

const getTotalProductCount = async (req, res) => {
  try {
    const totalCount = await productModel.getTotalProductCount();
    return res
      .status(200)
      .json(okResp("Successfully get product count", totalCount));
  } catch (e) {
    console.error("Error get product count: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const getTotalStoreValue = async (req, res) => {
  try {
    const totalStoreValue = await productModel.getTotalStoreValue();
    return res
      .status(200)
      .json(okResp("Successfully get store value", totalStoreValue));
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const getOutOfStockItemsWithCount = async (req, res) => {
  try {
    const { outOfStockItems, outOfStockItemsCount } =
      await productModel.getOutOfStockProducts();
    return res.status(200).json(
      okResp("Successfully get out of stock items", {
        outOfStockItems,
        outOfStockItemsCount,
      })
    );
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const insertProductController = async (req, res) => {
  try {
    const { name, price, stock_amount, image_url, category_name } = req.body;
    const categoryMap = await getCategoryNameIdMapping();
    const category_id = categoryMap[category_name];

    const newProductData = {
      id: uuid.v4(),
      name,
      price,
      stock_amount,
      image_url,
      category_id,
    };
    const addedProduct = await productModel.addProduct(newProductData);
    return res
      .status(200)
      .json(okResp("Successfully add product", addedProduct));
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;

    const result = await productModel.deleteProduct(productId);

    return res
      .status(200)
      .json(okResp("Successfully deleting product", result));
  } catch (e) {
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};
module.exports = {
  getAllProducts,
  getOneProduct,
  getProductByCategory,
  updateProduct,
  getTotalProductCount,
  getTotalStoreValue,
  getOutOfStockItemsWithCount,
  deleteProductController,
  insertProductController,
};
