const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err)
        return res.status(StatusCodes.FORBIDDEN).json({ message: "Forbidden" });
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      next();
    })
  );
};

module.exports = verifyJWT;
