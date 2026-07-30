import express from "express";
import {registerUser, loginUser, logoutUser, getCurrentUser,updateCurrentUser} from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

//logout route
router.post("/logout",logoutUser)

router.get(
    "/me",
    authenticateUser, 
    getCurrentUser,
);

router.put(
    "/me",
    authenticateUser,
    updateCurrentUser
);

export default router;