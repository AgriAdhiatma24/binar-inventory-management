const { productCategoryModel } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");

getCategories = async (_req, res) => {
    try {
        const categories = await productCategoryModel.loadCategories();
        const mapCategories = categories.map((category) => ({
          ...category
        }));
        return res
          .status(200)
          .json(okResp("Sucessfully fetching all categories", mapCategories));
      } catch (e) {
        console.error("Error fetching categories: ", e);
        return res.status(e.code || 500).json(errorResp(e.message));
      }
}

module.exports = { getCategories }