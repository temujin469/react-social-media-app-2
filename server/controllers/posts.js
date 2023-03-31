import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";
import User from "../models/User.js";
import uploadImage from "../utils/uploadImage.js";

/* CREATE */
export const createPost = asyncHandler(async (req, res) => {
  const { description, image, title } = req.body;
  const userId = req.user.id;

  const photoUrl = image ? await uploadImage(image) : undefined;

  const newPost = new Post({
    user: userId,
    title,
    description,
    picturePath: photoUrl,
    likes: [],
    comments: [],
  });
  await newPost.save();

  res.status(201).json({
    success: true,
    message: "Амжилттай нийтлэлээ",
  });
});

/* READ */
export const getFeedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("user", "firstName lastName email picturePath")
    .select("-friends -description");
  const allPosts = posts.map((post) => {
    const isMy = Boolean(post._doc.user._id.toString() === req.user.id);
    return { ...post._doc, isMy };
  });
  // console.log(allPosts);
  res.status(200).json({
    success: true,
    data: allPosts,
  });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id }).populate("user");
  res.status(200).json({
    success: true,
    data: post,
  });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ user: userId })
    .populate("user", "firstName lastName email picturePath")
    .select("-friends -description");
  res.status(200).json({
    success: true,
    data: posts,
  });
});

export const getFriendsPosts = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const currentUser = await User.findOne({ _id: userId });
  const posts = await Post.find({ user: { $in: currentUser.friends } })
    .populate("user", "firstName lastName email picturePath")
    .select("-friends -description");

  res.status(200).json({
    success: true,
    data: posts,
  });
});

/* UPDATE */
export const likePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await Post.findById(postId);
  const isLiked = post.likes.find((like) => like.toString() === userId);
  // console.log(isLiked);

  if (isLiked) {
    await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true }
    );
  } else {
    await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } },
      { new: true }
    );
  }

  return res.status(200).json({
    success: true,
    message: "Амжилттай",
  });
});

export const getLikeUsers = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate(
    "likes",
    "firstName email lastName picturePath"
  );

  res.status(200).json({
    success: true,
    data: post.likes,
  });
});
