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
  createVendorPurchaseOrder,
  getVendorPurchaseOrders,
  getVendorPurchaseOrderById,
} = require(
  "../controllers/vendorPurchaseOrderController"
);

const router =
  express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  createVendorPurchaseOrder
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  getVendorPurchaseOrders
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  getVendorPurchaseOrderById
);

module.exports =
  router;