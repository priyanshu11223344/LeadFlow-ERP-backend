const express = require("express");

const {
  createVendorPurchaseOrder,
  getVendorPurchaseOrders,
  getVendorPurchaseOrderById,
} = require(
  "../controllers/vendorPurchaseOrderController"
);

const router = express.Router();

router.post(
  "/",
  createVendorPurchaseOrder
);

router.get(
  "/",
  getVendorPurchaseOrders
);

router.get(
  "/:id",
  getVendorPurchaseOrderById
);

module.exports = router;