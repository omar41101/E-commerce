import express from "express";
const router = express.Router();

import {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calcualteTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";

import {   authentificate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authentificate, createOrder)
  .get(authentificate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authentificate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calcualteTotalSalesByDate);
router.route("/:id").get(authentificate, findOrderById);
router.route("/:id/pay").put(authentificate, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authentificate, authorizeAdmin, markOrderAsDelivered);

export default router;