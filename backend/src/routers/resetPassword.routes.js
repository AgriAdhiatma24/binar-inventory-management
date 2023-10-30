const express = require("express");
const dotenv = require("dotenv");
const { resetPasswordController } = require("../controllers");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const resetPasswordRouter = express();
resetPasswordRouter.post("/forgot-password", resetPasswordController.forgotPassword)
resetPasswordRouter.post("/:userId", resetPasswordController.resetUserPassword)

module.exports = resetPasswordRouter