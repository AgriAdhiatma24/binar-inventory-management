const express = require("express");
const dotenv = require("dotenv");
const { userProfileController } = require("../controllers");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const userProfileRouter = express();
userProfileRouter.get("/:userId", userProfileController.getUserProfile); //Done
userProfileRouter.put("/:userId", userProfileController.updateUserProfile); //Done
userProfileRouter.delete("/:userId", userProfileController.deleteUserProfile); // Done

module.exports = userProfileRouter;
