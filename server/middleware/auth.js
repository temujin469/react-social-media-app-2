import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import MyError from "../utils/MyError.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new MyError(
      "Та эхлээд логин хийнэ үү. Authorization header-ээр токеноо дамжуулна уу.",
      401
    );
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new MyError("Токен байхгүй байна.", 401);
  }

  const tokenObj = jwt.verify(token, process.env.JWT_SECRET);

  console.log("tokenObj==>", tokenObj);
  req.user = tokenObj;

  next();
});
