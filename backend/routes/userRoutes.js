import express from "express";
 import { creatUser, loginUser,logoutUser, getAllUsers, getCurrectUserProfile, updateCurrentUserProfile } from "../controllers/userController.js";
import { authentificate, authorizeAdmin } from "../middlewares/authMiddleware.js";


 const router = express.Router();
router.route("/").post(creatUser).get(authentificate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser)
router.post("/logout", logoutUser)
router.route("/profile").get(authentificate , getCurrectUserProfile).put(authentificate , updateCurrentUserProfile)
 
export default router;
