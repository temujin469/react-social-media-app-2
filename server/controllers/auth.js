import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import MyError from "../utils/MyError.js";
import uploadImage from "../utils/uploadImage.js";

/* REGISTER USER */
export const register = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    image,
    friends,
    location,
    occupation,
  } = req.body;

  // console.log(req.body);

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);
  const photoUrl = await uploadImage(image);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
    picturePath: photoUrl,
    friends,
    location,
    occupation,
    viewedProfile: Math.floor(Math.random() * 10000),
    impressions: Math.floor(Math.random() * 10000),
  });
  await newUser.save();
  res.status(201).json({ success: true, message: "Амжилттай бүртгэгдлээ" });
});

/* LOGGING IN */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) throw new MyError("Бүртгэлтэй хэрэглэгч алга", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new MyError("Нууц үг эсвэл имэйл буруу байна.", 400);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  delete user.password;
  res.status(200).json({
    success: true,
    data: {
      ...user._doc,
      token,
    },
  });
});
