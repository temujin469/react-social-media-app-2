import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getCurrentUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/current-user", verifyToken, getCurrentUser);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", getUserFriends);

/* UPDATE */
router.patch("/friends/:friendId", verifyToken, addRemoveFriend);

export default router;
