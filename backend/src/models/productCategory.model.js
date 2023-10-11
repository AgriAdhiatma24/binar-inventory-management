const db = require("../db/db.config");
const { ErrorServer } = require("../utils/errorHandlers");

const loadCategories = async () => {
    try {
      return await db.select("*").from("product_category");
    } catch (e) {
      throw new ErrorServer(e.detail);
    }
  };

  module.exports = { loadCategories }