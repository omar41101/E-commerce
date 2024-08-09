import user from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const authentificate = asyncHandler(async (req, res, next) => {
  let token;
  //Read jwt from 'jwt' cookie
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized , token failed");
    }
  } else {
    res.status(401);
    throw new Error("not authorized , no token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("not authtorized as an admin");
  }
};

export { authorizeAdmin, authentificate };
