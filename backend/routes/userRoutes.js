import express from "express";
 import { creatUser, loginUser,logoutUser, getAllUsers } from "../controllers/userController.js";
import { authentificate, authorizeAdmin } from "../middlewares/authMiddleware.js";


 const router = express.Router();
router.route("/").post(creatUser).get(authentificate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser)
router.post("/logout", logoutUser)
 
export default router;
