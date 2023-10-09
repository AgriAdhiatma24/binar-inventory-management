const db = require("../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../utils/errorHandlers");

const loadProducts = async () => {
  try {
    return await db.select("*").from("product");
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const editProduct = async (productId, updatedData) => {
  try {
    const [updatedProduct] = await db('product')
      .where({ id: productId })
      .update(updatedData)
      .returning('*');

    if (!updatedProduct) {
      throw new ErrorNotFound(`Product with ID ${productId} not found`);
    }

    return updatedProduct;
  } catch (e) {
    throw new ErrorServer(e.message);
  }
};

module.exports = { loadProducts, editProduct };
