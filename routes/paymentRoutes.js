const express = require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const {
  createPayment,
  getPayments,
  getPaymentById,
} = require(
  "../controllers/paymentController"
);

const router =
  express.Router();

// CREATE PAYMENT
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  createPayment
);

// GET ALL PAYMENTS
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  getPayments
);

// GET PAYMENT BY ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  getPaymentById
);

module.exports =
  router;