const db = require("../db/db.config");
const { ErrorServer } = require("../utils/errorHandlers");

const loadProducts = async () => {
  try {
    return await db.select("*").from("product");
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

module.exports = { loadProducts };
