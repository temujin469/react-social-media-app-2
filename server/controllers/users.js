import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/* READ */
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUserFriends = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate(
      "friends",
      "_id firstName lastName occupation picturePath location"
    )
    .select("friends");

  res.status(200).json({
    success: true,
    data: user.friends,
  });
});

/* UPDATE */
export const addRemoveFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.params;
  const userId = req.params.id;
  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (user.friends.includes(friendId)) {
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
  } else {
    user.friends.push(friendId);
    friend.friends.push(userId);
  }
  await user.save();
  await friend.save();

  // const friends = await Promise.all(
  //   user.friends.map((id) => User.findById(id))
  // );

  // const { friends } = user.populate(
  //   "friends",
  //   "_id firstName lastName occupation location picturePth"
  // );

  res.status(200).json({
    success: true,
    message: "Амжилттай дагсан",
  });
});
