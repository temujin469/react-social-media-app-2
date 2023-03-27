import { v2 as cloudinary } from "cloudinary";
import MyError from "./MyError.js";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  overwrite: true,
  invalidate: true,
  folder: "sharely-social-media",
  resource_type: "auto",
};

export default (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (err, result) => {
      if (result && result.secure_url) {
        console.log("secure url==>", result.secure_url);
        return resolve(result.secure_url);
      }
      return reject(new MyError(err.message, 500));
    });
  });
};
