import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getPost,
  createPost,
  getLikeUsers,
  getFriendsPosts,
} from "../controllers/posts.js";

const router = express.Router();

// CREATE
router.post("/", createPost);
/* READ */
router.get("/", getFeedPosts);
router.get("/friends", getFriendsPosts);
router.get("/:id", getPost);
router.get("/:userId/posts", getUserPosts);
router.get("/:id/like", getLikeUsers);

/* UPDATE */
router.patch("/:id/like", likePost);

export default router;
