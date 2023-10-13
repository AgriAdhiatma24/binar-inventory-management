const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_SECRET;
const { errorResp } = require("../utils/responseHandlers");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const access_token = token.split(" ")[1];

  if (!access_token) {
    return res.status(401).json(errorResp("Access token is missing"));
  }

  jwt.verify(access_token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json(errorResp("Invalid Access Token"));
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = verifyToken;
