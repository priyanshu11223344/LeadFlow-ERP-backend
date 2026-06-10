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
  createVendor,
  getVendors,
  getVendorById,
} = require(
  "../controllers/vendorController"
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
  createVendor
);

router.get(
  "/",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  getVendors
);

router.get(
  "/:id",
  authMiddleware,
  authorizeRoles(
    "ADMIN",
    "PROCUREMENT_MANAGER"
  ),
  getVendorById
);

module.exports =
  router;