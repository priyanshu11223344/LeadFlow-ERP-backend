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
  getSalesReport,
  getInventoryReport,
  getProcurementReport,
  getRevenueReport,
} = require(
  "../controllers/reportController"
);

const router =
  express.Router();

// SALES REPORT
router.get(
  "/sales",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  getSalesReport
);

// INVENTORY REPORT
router.get(
  "/inventory",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  getInventoryReport
);

// PROCUREMENT REPORT
router.get(
  "/procurement",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  getProcurementReport
);

// REVENUE REPORT
router.get(
  "/revenue",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "FINANCE"
  ),
  getRevenueReport
);

module.exports =
  router;