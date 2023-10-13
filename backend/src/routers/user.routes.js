const express = require("express");
const dotenv = require("dotenv");
const { userController } = require("../controllers");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const userRouter = express();
userRouter.post("/register", userController.registerUser); //Done
userRouter.get("/users", userController.getUsers); //Done
userRouter.put("/:id", userController.updatePassword); //Done
userRouter.delete("/:id", userController.deleteUserAndProfile); //Done
userRouter.post("/login", userController.isLogin); //Done

module.exports = userRouter;
