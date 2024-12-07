import express from "express";
import { createCategory ,readCategory,updateCategory,listCategory, deleteCategory} from "../controllers/categoryController.js";
import { authentificate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const router = express.Router()


router.route("/").post(createCategory);
router.route("/:categoryId").put(authentificate, authorizeAdmin, updateCategory)
router.route("/:categoryId").delete(deleteCategory)
router.route("/categories").get(listCategory)
router.route("/:id").get(readCategory)
export default router

