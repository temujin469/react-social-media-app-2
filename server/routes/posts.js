import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  getPost,
  createPost,
  getLikeUsers,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// CREATE
router.post("/", verifyToken, createPost);

/* READ */
router.get("/", getFeedPosts);
router.get("/:id", getPost);
router.get("/:userId/posts", getUserPosts);
router.get("/:id/like", getLikeUsers);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
