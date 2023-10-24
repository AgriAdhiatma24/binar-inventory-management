const db = require("../db/db.config");
const { ErrorServer, ErrorUserInput, ErrorNotFound } = require("../utils/errorHandlers");

const loadCategories = async () => {
    try {
      return await db.select("*").from("product_category");
    } catch (e) {
      throw new ErrorServer(e.detail);
    }
  };

const addCategory = async (newCategory) => {
    try {
        const existingCategory = await db('product_category')
        .where('name', newCategory.name)
        .first()

        if (existingCategory){
            throw new ErrorUserInput('Category with this name already exists');
        }

        const [addedCategory] = await db("product_category")
        .insert(newCategory)
        .returning("*")

        return addedCategory
    } catch (e) {
        if (e instanceof ErrorUserInput) {
            throw e;
          } else {
            throw new ErrorServer('Internal Server Error');
          }
    }
}

const deleteCategory = async (categoryId) => {
  try {
    const [deletedCategory] = await db("product_category")
      .where({id: categoryId})
      .del()
      .returning("*")

      if (!deletedCategory) {
        throw new ErrorNotFound(`Category with ID ${categorytId} not found`);
      }

      return deletedCategory
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

const editCategory = async (categoryId, updatedData) => {
  try {
    const [updatedCategory] = await db("product_category")
      .where({id: categoryId})
      .update(updatedData)
      .returning("*")

      if (!updatedCategory) {
        throw new ErrorNotFound(`Category with ID ${categorytId} not found`);
      }

      return updatedCategory
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
}

  module.exports = { loadCategories, addCategory, deleteCategory, editCategory }