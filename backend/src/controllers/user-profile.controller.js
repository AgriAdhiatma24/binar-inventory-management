const { userProfile } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");

const getUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    const profileUser = await userProfile.getUserProfileByUserId(userId);
    if (profileUser) {
      return res
        .status(200)
        .json(okResp("Success Get User Profile", profileUser));
    }
  } catch (e) {
    console.error("Error fetching user profile: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { fullName, dateOfBirth, address, email } = req.body;

  try {
    await userProfile.updateUserProfile(userId, fullName, dateOfBirth, address, email);
    return res.status(200).json(okResp("User Profile Updated Successfuly"));
  } catch (e) {
    console.error("Error updating user profile: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const deleteUserProfile = async (req, res) => {
  const userId = req.params.userId;

  try {
    await userProfile.deleteUserProfile(userId);
    return res.status(200).json(okResp("User Profile Deleted Successfuly"));
  } catch (e) {
    console.error("Error deleting user profile: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
