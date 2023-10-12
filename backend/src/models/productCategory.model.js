const db = require("../db/db.config");
const { ErrorServer, ErrorUserInput } = require("../utils/errorHandlers");

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

  module.exports = { loadCategories, addCategory }