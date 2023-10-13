const express = require("express");
const dotenv = require("dotenv");
const { userProfileController } = require("../controllers");
const verifyToken = require("../middlewares/auth");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const userProfileRouter = express();
userProfileRouter.get(
  "/:userId",
  verifyToken,
  userProfileController.getUserProfile
); //Done
userProfileRouter.put(
  "/:userId",
  verifyToken,
  userProfileController.updateUserProfile
); //Done
userProfileRouter.delete(
  "/:userId",
  verifyToken,
  userProfileController.deleteUserProfile
); // Done

module.exports = userProfileRouter;
