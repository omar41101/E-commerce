import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import { addProduct, fetchProductById, fetchAllProducts, fetchTopProducts, addProductReview, fetchNewProducts, fetchProducts, removeProduct, updateProductDetails } from "../controllers/productController.js";
import { authentificate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkid.js";

router
  .route("/")
  .post(authentificate, authorizeAdmin, formidable(), addProduct)
  .get(fetchProducts)

router.route("/:id/reviews").post(authentificate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router.route('/allproducts').get(fetchAllProducts)

router
  .route("/:id")
  .get(fetchProductById)
  .put(authentificate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authentificate, authorizeAdmin, removeProduct)

export default router;