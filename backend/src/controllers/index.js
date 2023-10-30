const productController = require("./product.controller");
const productCategoryController = require("./productCategory.controller");
const userController = require("./user.controller");
const userProfileController = require("./user-profile.controller");
const resetPasswordController = require("./resetPassword.controller")

module.exports = {
  productController,
  productCategoryController,
  userController,
  userProfileController,
  resetPasswordController
};
