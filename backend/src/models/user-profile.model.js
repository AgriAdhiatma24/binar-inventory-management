const db = require("../db/db.config");
const { ErrorServer, ErrorNotFound } = require("../utils/errorHandlers");
const uuid = require("uuid");

const getUserProfileByUserId = async (userId) => {
  try {
    return db("user_profile").where("user_id", userId).first();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const createUserProfile = async (userId, fullName, dateOfBirth, address) => {
  try {
    const id = uuid.v4();
    return db("user_profile").insert({
      id: id,
      user_id: userId,
      full_name: fullName,
      date_of_birth: dateOfBirth,
      address,
    });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const updateUserProfile = async (userId, fullName, dateOfBirth, address) => {
  try {
    return db("user_profile").where("user_id", userId).update({
      full_name: fullName,
      date_of_birth: dateOfBirth,
      address,
    });
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

const deleteUserProfile = async (userId) => {
  try {
    return db("user_profile").where("user_id", userId).del();
  } catch (e) {
    throw new ErrorServer(e.detail);
  }
};

module.exports = {
  getUserProfileByUserId,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
