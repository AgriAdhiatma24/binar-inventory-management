const express = require("express");
const productRouter = require("./product.routes");
const productCategoryRouter = require("./productCategory.routes");
const userRouter = require("./user.routes");
const userProfileRouter = require("./user-profile.routes");
const resetPasswordRouter = require("./resetPassword.routes")

const API_PATH = process.env.API_PATH;
const PRODUCT_PATH_V1 = `${API_PATH}/product`;
const CATEGORY_PATH_V1 = `${API_PATH}/product-category`;
const USER_PATH_V1 = `${API_PATH}/auth`;
const USER_PROFILE_PATH_V1 = `${API_PATH}/user-profile`;
const RESET_PASSWORD_PATH_V1 = `${API_PATH}/reset-password`
const appRouter = express();

appRouter.use(`${PRODUCT_PATH_V1}`, productRouter);
appRouter.use(`${CATEGORY_PATH_V1}`, productCategoryRouter);
appRouter.use(`${USER_PATH_V1}`, userRouter);
appRouter.use(`${USER_PROFILE_PATH_V1}`, userProfileRouter);
appRouter.use(`${RESET_PASSWORD_PATH_V1}`, resetPasswordRouter)

module.exports = appRouter;
