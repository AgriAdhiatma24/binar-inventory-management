const { productCategoryModel } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");
const uuid = require("uuid");

const getCategories = async (_req, res) => {
  try {
    const categories = await productCategoryModel.loadCategories();
    const mapCategories = categories.map((category) => ({
      ...category,
    }));
    return res
      .status(200)
      .json(okResp("Sucessfully fetching all categories", mapCategories));
  } catch (e) {
    console.error("Error fetching categories: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const getOneProductCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const productCategory = await productCategoryModel.getSingleProductCategory(
      id
    );
    return res
      .status(200)
      .json(
        okResp("Sucessfully fetching one product category", productCategory)
      );
  } catch (e) {
    console.error("Error fetching product: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const createNewCategory = async (req, res) => {
  try {
    const name = req.body.name;

    const newData = {
      id: uuid.v4(),
      name,
    };

    if (!name) {
      return res.status(401).json(errorResp("name is required"));
    }

    const addedCategory = await productCategoryModel.addCategory(newData);
    return res
      .status(200)
      .json(okResp("Successfully create product category", addedCategory));
  } catch (e) {
    console.error("Error creating product category: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const deletedCategory = await productCategoryModel.deleteCategory(
      categoryId
    );
    return res
      .status(200)
      .json(okResp("Successfully delete product category", deletedCategory));
  } catch (e) {
    console.error("Error deleting product category: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;

    const updatedCategory = await productCategoryModel.editCategory(
      categoryId,
      updatedData
    );
    return res
      .status(200)
      .json(okResp("Successfully updated product category", updatedCategory));
  } catch (e) {
    console.error("Error updating product category: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const getTotalProductCategoryCount = async (_req, res) => {
  try {
    const totalProductCategory =
      await productCategoryModel.getProductCategoryCount();

    return res
      .status(200)
      .json(
        okResp("Sucessfully get product category count", totalProductCategory)
      );
  } catch (e) {
    console.error("Error get product count: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

module.exports = {
  getCategories,
  getOneProductCategory,
  createNewCategory,
  deleteCategory,
  updateCategory,
  getTotalProductCategoryCount,
};
