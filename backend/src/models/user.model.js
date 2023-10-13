const db = require("../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../utils/errorHandlers");
const bcrypt = require("bcrypt");

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    return await db("user").returning("id").insert({
      username,
      hash_password: hashedPassword,
    });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const getUserByUsername = async (username) => {
  try {
    return await db("user").where("username", username).first();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const getAllUser = async () => {
  try {
    return await db.select("*").from("user");
  } catch (e) {
    throw new ErrorServer();
  }
};

const updateUserPassword = async (userId, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await db("user")
      .where("id", userId)
      .update({ hash_password: hashedPassword });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const deleteUser = async (id) => {
  try {
    return await db("user").where("id", id).del();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getAllUser,
  updateUserPassword,
  deleteUser,
};
