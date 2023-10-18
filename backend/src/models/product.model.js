const db = require("../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../utils/errorHandlers");

const loadProducts = async () => {
  try {
    return await db.select("*").from("product");
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const getSingleProduct = async (id) => {
  try {
    return await db.select("*").from("product").where({ id }).first();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const editProduct = async (productId, updatedData) => {
  try {
    const [updatedProduct] = await db("product")
      .where({ id: productId })
      .update(updatedData)
      .returning("*");

    if (!updatedProduct) {
      throw new ErrorNotFound(`Product with ID ${productId} not found`);
    }

    return updatedProduct;
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

const addProduct = async (newProductData) => {
  try {
    const [addedProduct] = await db("product")
      .insert(newProductData)
      .returning("*");

    return addedProduct;
  } catch (error) {
    throw new Error(`Error adding product: ${error.message}`);
  }
};

const deleteProduct = async (productId) => {
  try {
    const rowsDeleted = await db("product").where({ id: productId }).del();

    if (rowsDeleted === 0) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }
};

const getTotalProductCount = async () => {
  try {
    const countProduct = await db("product").count("id as totalCount").first();
    return countProduct.totalCount;
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

const getTotalStoreValue = async () => {
  try {
    const products = await db("product").select(
      "id",
      "name",
      "price",
      "stock_amount"
    );
    const totalStoreValue = products.reduce((total, product) => {
      return total + product.price * product.stock_amount;
    }, 0);
    return totalStoreValue;
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

const getOutOfStockProducts = async () => {
  try {
    const outOfStockItems = await db("product")
      .select("name")
      .where("stock_amount", 0);
    const outOfStockItemsCount = outOfStockItems.length;
    return { outOfStockItems, outOfStockItemsCount };
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

module.exports = {
  deleteProduct,
  addProduct,
  loadProducts,
  editProduct,
  getSingleProduct,
  loadProducts,
  editProduct,
  getSingleProduct,
};
const getTotalProductCount = async () => {
  try {
    const countProduct = await db("product").count("id as totalCount").first();
    return countProduct.totalCount;
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

const getTotalStoreValue = async () => {
  try {
    const products = await db("product").select(
      "id",
      "name",
      "price",
      "stock_amount"
    );
    const totalStoreValue = products.reduce((total, product) => {
      return total + product.price * product.stock_amount;
    }, 0);
    return totalStoreValue;
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

const getOutOfStockProducts = async () => {
  try {
    const outOfStockItems = await db("product")
      .select("name")
      .where("stock_amount", 0);
    const outOfStockItemsCount = outOfStockItems.length;
    return { outOfStockItems, outOfStockItemsCount };
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

module.exports = {
  loadProducts,
  editProduct,
  getSingleProduct,
  getTotalProductCount,
  getTotalStoreValue,
  getOutOfStockProducts,
};
