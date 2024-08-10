import express from "express";
import {
  deleteUserById,
  creatUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrectUserProfile,
  updateCurrentUserProfile,
  getUserById,
} from "../controllers/userController.js";
import {
  authentificate,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .route("/")
  .post(creatUser)
  .get(authentificate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authentificate, getCurrectUserProfile)
  .put(authentificate, updateCurrentUserProfile);

  //ADMIN routes !!! 
router
  .route("/:id")
  .delete(authentificate, authorizeAdmin, deleteUserById)
  .get(authentificate, authorizeAdmin, getUserById);

  
export default router;
