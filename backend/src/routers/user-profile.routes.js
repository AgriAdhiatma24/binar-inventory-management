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
);
userProfileRouter.put(
  "/:userId",
  verifyToken,
  userProfileController.updateUserProfile
);
userProfileRouter.delete(
  "/:userId",
  verifyToken,
  userProfileController.deleteUserProfile
);

module.exports = userProfileRouter;
