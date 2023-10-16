const express = require("express");
const dotenv = require("dotenv");
const { userController } = require("../controllers");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.development" });
}

const userRouter = express();
userRouter.post("/register", userController.registerUser);
userRouter.get("/users", userController.getUsers);
userRouter.put("/:id", userController.updatePassword);
userRouter.delete("/:id", userController.deleteUserAndProfile);
userRouter.post("/login", userController.isLogin);

module.exports = userRouter;
