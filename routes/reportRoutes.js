const express = require("express");

const {
  getSalesReport,
  getInventoryReport,
  getProcurementReport,
  getRevenueReport,
} = require(
  "../controllers/reportController"
);

const router = express.Router();

// SALES REPORT
router.get(
  "/sales",
  getSalesReport
);

// INVENTORY REPORT
router.get(
  "/inventory",
  getInventoryReport
);

// PROCUREMENT REPORT
router.get(
  "/procurement",
  getProcurementReport
);

// REVENUE REPORT
router.get(
  "/revenue",
  getRevenueReport
);

module.exports = router;