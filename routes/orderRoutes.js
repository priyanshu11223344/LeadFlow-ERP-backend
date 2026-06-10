const express =
  require("express");

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const authorizeRoles =
  require(
    "../middleware/roleMiddleware"
  );

const router =
  express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
} = require(
  "../controllers/orderController"
);

// CREATE ORDER
router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES"
  ),
  createOrder
);

// GET ALL ORDERS
router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES",
    "INVENTORY_MANAGER",
    "PROCUREMENT_MANAGER",
    "FINANCE"
  ),
  getOrders
);

// GET ORDER BY ID
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "SALES",
    "INVENTORY_MANAGER",
    "PROCUREMENT_MANAGER",
    "FINANCE"
  ),
  getOrderById
);

module.exports =
  router;