const { user, userProfile } = require("../models");
const { errorResp, okResp } = require("../utils/responseHandlers");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password, fullName, dateOfBirth, address, email } = req.body;
  try {
    //Destructuring user_id to get first element of createUser, which is ID
    const [user_id] = await user.createUser(username, password);
    const userId = user_id.id;
    await userProfile.createUserProfile(userId, fullName, dateOfBirth, address, email);
    return res.status(201).json(
      okResp("User Registered Sucessfully", {
        email,
        username,
        fullName,
        dateOfBirth,
        address,
      })
    );
  } catch (e) {
    console.error("Error registering user: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await user.getAllUser();
    return res.status(200).json(okResp("Success Fetching Users", users));
  } catch (e) {
    console.error("Error fetching users: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const updatePassword = async (req, res) => {
  const id = req.params.id;
  const newPassword = req.body.password;
  try {
    await user.updateUserPassword(id, newPassword);
    return res.status(200).json(okResp("User Password Updated Sucessfully"));
  } catch (e) {
    console.error("Error updating user password: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const setToken = (access_token, refresh_token) => {
  access_token, refresh_token;
};

const loginController = async (req, res) => {
  const { username, password } = req.body;
  const JWT_KEY = process.env.JWT_SECRET;
  const JWT_REFRESH_KEY = process.env.JWT_REFRESH_SECRET;
  try {
    const userByUsername = await user.getUserByUsername(username);
    if (
      userByUsername &&
      (await bycrypt.compare(password, userByUsername.hash_password))
    ) {
      const access_token = jwt.sign(
        { user: { user_id: userByUsername.id } },
        JWT_KEY,
        {
          expiresIn: "1d",
        }
      );

      const refresh_token = jwt.sign(
        { user: { user_id: userByUsername.id } },
        JWT_REFRESH_KEY,
        {
          expiresIn: "7d",
        }
      );
      return res.status(201).json(
        okResp("Login Sucessfully", {
          access_token: access_token,
          refresh_token: refresh_token,
        })
      );
    } else {
      res.status(403).json(errorResp("Invalid Credentials"));
    }
  } catch (e) {
    console.error("Error registering user: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const logoutController = (_req, res) => {
  try {
    setToken(null, null);
    res.status(200).json(okResp("Logged out successfully"));
  } catch (e) {
    console.error("Failed to logout: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};

const deleteUserAndProfile = async (req, res) => {
  const id = req.params.id;
  try {
    await user.deleteUser(id);
    await userProfile.deleteUserProfile(id);
    return res.status(200).json(okResp("User & Profile Deleted Successfuly"));
  } catch (e) {
    console.error("Error Deleting User and Profile: ", e);
    return res.status(e.code || 500).json(errorResp(e.message));
  }
};


module.exports = {
  registerUser,
  loginController,
  logoutController,
  getUsers,
  updatePassword,
  deleteUserAndProfile,
};
